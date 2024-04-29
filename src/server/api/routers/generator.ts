import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { ChangeGeneratorSettings, CreateStatusLog } from "~/server/schemas/generator";

export const generatorRouter = createTRPCRouter({
    findAllGenerators: protectedProcedure
        .input(z.object({

        }))
        .query(async ({ ctx, input }) => {
            const [generators, count] = await ctx.db.$transaction([
                ctx.db.generator.findMany({
                    orderBy: {
                        id: "asc"
                    },
                    where: {
                        NOT: {
                            deleted: true,
                        },
                    },
                    // // skip: input?.page
                    // //     ? (input.page - 1) * (input.limit ?? 10)
                    // //     : undefined,
                    // take: input?.limit ?? undefined,
                }),
                ctx.db.generator.count({
                    where: {
                        NOT: {
                            deleted: true,
                        },
                    },
                }),
            ])

            let obj: { [key: string]: any } = {};


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
            limit: z.number().optional()
        }))
        .query(async ({ ctx, input }) => {
            const [logs, count] = await ctx.db.$transaction([
                ctx.db.statusLogs.findMany({
                    orderBy: {
                        createdAt: "desc",
                    },
                    where: {
                       generatorId: input.filter?.generatorId
                    },
                    // skip: input?.page
                    //     ? (input.page - 1) * (input.limit ?? 10)
                    //     : undefined,
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

            const groupedLogs: { [key: string]: any } = logs.reduce((acc, log) => {
                const key = log.createdAt.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                // If the key doesn't exist in the accumulator, initialize it
                if (!acc[key]) {
                    acc[key] = [];
                }
                // Push the current object into the corresponding array
                acc[key].push(log);

                return acc;
            }, obj); // Start with an empty object

            console.log(groupedLogs)
            // const groupedLogs = groupByDate(logs)
            return {
                groupedLogs,
                count
            }
        }),

    changeGeneratorData: protectedProcedure
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

                console.log(updates)
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
        })
})