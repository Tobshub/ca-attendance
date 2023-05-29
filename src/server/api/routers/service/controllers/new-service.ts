import { privateProcedure, tError } from "@/server/api/trpc";
import { Ok } from "@/server/utils/result";
import { z } from "zod";

export const NewService = privateProcedure
  .input(z.object({ date: z.date(), name: z.string() }))
  .mutation(async ({ input, ctx: {prisma, logger} }) => {
    try {
      const new_service = await prisma.service.create({
        data: { date: input.date, name: input.name },
      });

      logger.info(input, "Created new service");
      return Ok(new_service);
    } catch (err) {
      logger.error(err, "Failed to create service");
      throw new tError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create service",
      });
    }
  });
