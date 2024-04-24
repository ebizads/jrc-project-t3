import { TRPCError } from "@trpc/server"
import { z } from "zod"
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { ChangeUserPass } from "~/server/schemas/user";
import bcrypt from "bcrypt"

export const accountRouter = createTRPCRouter({
    findOne: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
        const account = await ctx.db.account.findUnique({
            where: {
                id: input,
            },
            include: {
                user: true
            },
        })

        return account
    }),

    change: protectedProcedure
        .input(ChangeUserPass)
        .mutation(async ({ input, ctx }) => {
            try {
                const { password, id, oldPassword, currentPassword, confirmPassword, ...rest } = input

                const encryptedPassword = await bcrypt.hash(password, 10)

                const sample: string[] = [...oldPassword]

                const match = await bcrypt.compare(
                    currentPassword ?? "",
                    `${sample[0]}`
                )
                if (!match) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "The current password is incorrect.",
                    })
                }

                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < sample.length; i++) {
                    const match = await bcrypt.compare(password, `${sample[i]}`)
                    if (match) {
                        throw new TRPCError({
                            code: "BAD_REQUEST",
                            message: "This password has already been used, try another.",
                        })
                    }
                }

                if (sample.length >= 12) {
                    sample.pop()
                }

                return await ctx.db.account.update({
                    where: {
                        id,
                    },
                    data: {
                        oldPassword: {
                            set: [encryptedPassword, ...sample],
                        },
                        password: encryptedPassword,
                        // verified: input.verified,
                        ...rest,
                    },
                })
            } catch (error) {
                throw error
            }
        }),
})