import { ParserWithInputOutput } from "@trpc/server/dist/core/parser";
import { tRouter, tProcedure } from "../config/trpc";
import z from "zod";
import {
  createUser,
  getUsersWithFilter,
} from "../controllers/user-controller";

const userRouter = tRouter({
  createUser: tProcedure
    .input<ParserWithInputOutput<CAWorkerRef, CAWorker>>(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        department: z.literal<Department[keyof Department]>(
          "Ushering" || "Choir" || "Technical" || "Prayer" || "Sanitation"
        ),
        appearances: z.number().catch(0),
      })
    )
    .mutation(async ({ input }) => {
      const user = await createUser(input);
      return user;
    }),
  filter: tProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input }): Promise<CAWorkerRef[]> => {
      if (!input.name) {
        return [];
      }
      const workers = await getUsersWithFilter(input.name);
      return workers;
    }),
  getOne: tProcedure.query(() => {}),
});

export default userRouter;
