import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { ChangeDashboardSettings, ChangeGeneratorSettings, CreateStatusLog } from "~/server/schemas/generator";

export const generatorRouter = createTRPCRouter({
    findAllGenerators: protectedProcedure
        .input(z.object({

        }))
        .query(async ({ ctx, input }) => {
            const [generators, count] = await ctx.db.$transaction([
                ctx.db.generator
                    .findMany({
                        orderBy: {
                            id: "asc"
                        },
                        where: {
                            NOT: {
                                deleted: true,
                            },
                        },
                    }),
                ctx.db.generator.count({
                    where: {
                        NOT: {
                            deleted: true,
                        },
                    },
                }),
            ])

            // const groupedLogs = groupByDate(logs)
            return {
                generators,
                count
            }
        }),
    findAllLogs: protectedProcedure
        .input(z.object({
            filter: z.object({
                generatorId: z.number().optional()
            }).optional(),
            page: z.number().optional(),
            limit: z.number().optional()
        }))
        .query(async ({ ctx, input }) => {
            const [logs, dashboardLogs, count] = await ctx.db.$transaction([
                //FIND MANY QUERY FOR LOG TABLE
                ctx.db.statusLogs.findMany({
                    orderBy: {
                        createdAt: "desc",
                    },
                    where: {
                        generatorId: input.filter?.generatorId
                    },
                    skip: input?.page
                        ? (input.page - 1) * (input.limit ?? 10)
                        : undefined,
                    take: input?.limit ?? undefined,
                }),
                //FIND MANY QUERY FOR DASHBOARD LOGS 
                ctx.db.statusLogs.findMany({
                    orderBy: {
                        createdAt: "desc",
                    },
                    where: {
                        generatorId: input.filter?.generatorId
                    },
                    take: input?.limit ?? undefined,
                }),
                ctx.db.statusLogs.count({
                    where: {
                        NOT: {
                            deleted: true,
                        },
                    },
                }),
            ])

            let obj: { [key: string]: any } = {};

            const groupedLogs: { [key: string]: any } = dashboardLogs.reduce((acc, log) => {
                const key = log.createdAt.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                // If the key doesn't exist in the accumulator, initialize it
                if (!acc[key]) {
                    acc[key] = [];
                }
                // Push the current object into the corresponding array
                acc[key].push(log);

                return acc;
            }, obj); // Start with an empty object

            // const groupedLogs = groupByDate(logs)
            return {
                logs,
                groupedLogs,
                count
            }
        }),
    changeDashboardTitle: protectedProcedure
        .input(ChangeDashboardSettings)
        .mutation(async ({ ctx, input }) => {
            try {
                const [changeDashboard] = await ctx.db.$transaction(
                    [
                        // change Dashboard Title
                        ctx.db.generator.update({
                            where: {
                                id: 4
                            },
                            data: {
                                generatorName: input.headerTitle

                            },
                        }),
                        ctx.db.generator.update({
                            where: {
                                id: 5
                            },
                            data: {
                                generatorName: input.subHeaderTitle

                            },
                        })
                    ]
                )
                // return updates
                // return "Generator names successfully updated"
            } catch (error) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: JSON.stringify(error),
                })
            }
        }),
    changeGeneratorSettings: protectedProcedure
        .input(ChangeGeneratorSettings)
        .mutation(async ({ ctx, input }) => {
            try {
                const updates = input.generatorNames?.map(async (generator, index) => {
                    if (generator) {
                        return ctx.db.generator.update({
                            where: {
                                id: generator?.id,
                            },
                            data: {
                                generatorName: generator?.generatorName

                            },
                        })
                    }
                })

                // return updates
                await ctx.db.$transaction(async () => updates)

                // return "Generator names successfully updated"
            } catch (error) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: JSON.stringify(error),
                })
            }
        }),

    createLog: protectedProcedure
        .input(CreateStatusLog)
        .mutation(async ({ input, ctx }) => {
            const { ...rest } = input
            try {
                await ctx.db.statusLogs.create({
                    data: {
                        ...rest
                    }
                })
            } catch (error) {
                throw error
            }
        }),
    editGeneratorRunningTime: protectedProcedure
        .input(z.object({
            generatorId: z.number(),
            runningTime: z.number(),
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                const [editRunningTime] = await ctx.db.$transaction(
                    [
                        // change Dashboard Title
                        ctx.db.generator.update({
                            where: {
                                id: input.generatorId
                            },
                            data: {
                                runningTime: input.runningTime
                            },
                        }),
                    ]
                )

                // console.log(updates)
                // return updates

                return "Generator Running Time successfully updated"
            } catch (error) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: JSON.stringify(error),
                })
            }
        }),

})