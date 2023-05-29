import { z } from "zod";
import { createTRPCRouter, publicProcedure, tError } from "../trpc";
import { env } from "@/env.mjs";
import { AuthToken } from "@/server/utils/token";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .query(({ input }) => {
      const valid =
        input.username === env.ROOT_USERNAME &&
        input.password === env.ROOT_PASSWORD;

      if (valid) {
        const token = AuthToken.generate(env.ROOT_USERNAME);
        if (token.ok) {
          return token;
        } else {
          throw new tError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to generate token",
          });
        }
      } else {
        throw new tError({
          code: "UNAUTHORIZED",
          message: "Username or Password is wrong",
        });
      }
    }),
});
