import { Router } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";

const apiRouter = Router();

apiRouter.use(
  "/",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

export default apiRouter;
