import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { ChangeUserPass, ResetForgotPass } from "~/server/schemas/user";
import bcrypt from "bcrypt";
import { addHoursToDate, generateCertificate } from "~/utils/functions";
import { sendEmail } from "~/pages/api/sendEmail";

export const accountRouter = createTRPCRouter({
    findOne: protectedProcedure
        .input(z.number())
        .query(async ({ input, ctx }) => {
            const account = await ctx.db.account.findUnique({
                where: {
                    id: input,
                },
                include: {
                    user: true,
                },
            });

            return account;
        }),
    findOneEmailOrToken: publicProcedure
        .input(
            z.object({
                email: z.string().optional(),
                token: z.string().optional(),
            })
        )
        .query(async ({ input, ctx }) => {
            const account = await ctx.db.account.findFirst({
                where: {
                    user: {
                        email: input.email,

                    },
                    // reset_token: input.token,

                    // OR: [
                    //     {
                    //         reset_token: input.token,
                    //     },
                    // ],
                },
            })

            return account
        }),


    findOneWithUsernamePassword: protectedProcedure
        .input(
            z.object({
                username: z.string(),
                password: z.string()

            }))
        .mutation(async ({ input, ctx }) => {
            const encryptedPassword = await bcrypt.hash(input.password, 10)

            // console.log("encrypted password", encryptedPassword)
            try {
                const account = await ctx.db.account.findUnique({
                    where: {
                        username: input.username,
                        // password: await bcrypt.hash(input.password, 10)
                    },
                    include: {
                        user: true,
                    },
                });

                if (account == null) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "The provided account does not exist",
                    })
                }

                const match = await bcrypt.compare(input.password, account?.password)
                if (!match) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "Incorrect password",
                    })
                }

                // console.log(account)

                // console.log("ACCOUNT", account)
                if (account?.type != "Admin") {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "The  provided account is not authorized to START/STOP",
                    })
                }
                return account;
            } catch (error) {
                throw error
            }


        }),

    change: protectedProcedure
        .input(ChangeUserPass)
        .mutation(async ({ input, ctx }) => {
            try {
                const {
                    password,
                    id,
                    oldPassword,
                    currentPassword,
                    confirmPassword,
                    ...rest
                } = input;

                const encryptedPassword = await bcrypt.hash(password, 10);

                const sample: string[] = [...oldPassword];

                const match = await bcrypt.compare(
                    currentPassword ?? "",
                    `${sample[0]}`
                );
                if (!match) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "The current password is incorrect.",
                    });
                }

                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < sample.length; i++) {
                    const match = await bcrypt.compare(
                        password,
                        `${sample[i]}`
                    );
                    if (match) {
                        throw new TRPCError({
                            code: "BAD_REQUEST",
                            message:
                                "This password has already been used, try another.",
                        });
                    }
                }

                if (sample.length >= 12) {
                    sample.pop();
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
                });
            } catch (error) {
                throw error;
            }
        }),

    createForgotPassToken: publicProcedure
        .input(z.string())
        .mutation(async ({ input, ctx }) => {
            try {
                const account = await ctx.db.account.findFirst({
                    where: {
                        OR: [
                            {
                                username: input,
                            },
                            {
                                user: {
                                    email: input
                                }
                            }
                        ]
                        // password: await bcrypt.hash(input.password, 10)
                    },
                    include: {
                        user: true,
                    },
                });

                console.log(account)

                const currentDate = new Date()
                let forgetPassToken
                let token

                if (!account) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "The email provided is not an existing user!",
                    })
                } else if (account.reset_token && (account.reset_until != null && currentDate < account.reset_until)) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: `Forgot Password link already sent. Please check your e-mail inbox.`,
                    })
                } else {
                    token = generateCertificate()
                    forgetPassToken = await ctx.db.account.update({
                        where: {
                            username: account.username,
                        },
                        data: {
                            reset_token: token,
                            reset_until: addHoursToDate(new Date(), 24),
                        },
                    })

                    sendEmail({
                        sendTo: [account.user.email ?? ""],
                        // cc: null,
                        resetToken: token
                    })
                    return forgetPassToken
                }
            } catch (error) {
                throw error
            }
        }),
    resetForgotPass: publicProcedure
        .input(ResetForgotPass)
        .mutation(async ({ input, ctx }) => {
            try {
                const { password, id, oldPassword, ...rest } = input

                const encryptedPassword = await bcrypt.hash(password, 10)

                const sample: string[] = [...oldPassword]

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
                        reset_token: null,
                        reset_until: null,
                        // verified: input.verified,
                    },
                })
            } catch (error) {
                throw error
            }
        }),
});
