import { createTRPCRouter } from "~/server/api/trpc";
import { accountRouter } from "./routers/user";
import { generatorRouter } from "./routers/generator";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    // post: postRouter,
    account: accountRouter,
    generator: generatorRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
