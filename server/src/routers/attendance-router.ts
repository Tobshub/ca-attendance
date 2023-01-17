import { ParserWithInputOutput } from "@trpc/server/dist/core/parser";
import { tRouter, tProcedure } from "../config/trpc";
import z from "zod";

const attendanceRouter = tRouter({
  markPresent: tProcedure
    .input<ParserWithInputOutput<CAWorkerRef, CAWorkerRef>>(
      z.object({
        email: z.string(),
        name: z.string(),
        id: z.string(),
      })
    )
    .mutation(({ input }) => {
      console.log(`marking ${input.name} present...`);
    }),
});

export default attendanceRouter;
