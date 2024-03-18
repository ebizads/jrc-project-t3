import { PrismaAdapter } from "@auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions,
} from "next-auth";
import bcrypt from "bcrypt";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "~/env";
import { db } from "~/server/db";
import { Account } from "next-auth";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: DefaultSession["user"] & {
            id: number;
            // ...other properties
            // role: UserRole;
        };
    }

    interface Account {
        id: number;
    }

    interface User {
        id: number;
        // ...other properties
        // role: UserRole;
    }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }

            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = Number(token.sub);
            }
            return session;
        },
    },
    pages: {
        signIn: "/user/login",
    },
    session: { strategy: "jwt" },
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                username: { type: "text" },
                password: { type: "password" },
            },
            async authorize(credentials) {
                const encryptedPassword = await bcrypt.hash(
                    credentials?.password ?? "",
                    12
                );
                const account = await db.account.findUnique({
                    where: {
                        username: credentials?.username,
                    },
                });

                if (account != null) {
                    const isValid = bcrypt.compareSync(
                        credentials?.password ?? "",
                        account.password
                    );

                    if (isValid) {
                        const user = await db.user.findUnique({
                            where: {
                                uid: account.userId,
                            },
                        });
                        console.log(encryptedPassword);

                        console.log("User found:", user);
                        return user;
                    }
                    throw new Error("account not found");
                }
                throw new Error("Failed to Login.");
            },
        }),
    ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
}) => {
    return getServerSession(ctx.req, ctx.res, authOptions);
};
