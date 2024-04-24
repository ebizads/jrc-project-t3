import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { CreateStatusLog } from "~/server/schemas/generator";

export const generatorRouter = createTRPCRouter({
    createLog: protectedProcedure
        .input(CreateStatusLog)
        .mutation(async ({ input, ctx }) => {
            const { ...rest} = input
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