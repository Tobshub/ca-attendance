import { createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routers/auth";
import { serviceRouter } from "./routers/service/service-router";
import { memberRouter } from "./routers/member/member-router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  service: serviceRouter,
  member: memberRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
