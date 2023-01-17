import { tRouter } from "../config/trpc";
import attendanceRouter from "../routers/attendance-router";
import userRouter from "../routers/user-router";

export const appRouter = tRouter({
  attendance: attendanceRouter,
  users: userRouter,
});

export type AppRouter = typeof appRouter;
