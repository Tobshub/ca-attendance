import { privateProcedure, tError } from "@/server/api/trpc";
import { Ok } from "@/server/utils/result";
import { z } from "zod";

export const DeleteService = privateProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ input, ctx: { prisma, logger } }) => {
    try {
      await prisma.service.delete({
        where: { id: input.id },
        select: { id: true },
      });

      logger.info(input, "Deleted serivce");

      return Ok(input.id);
    } catch (err) {
      logger.error(err, "Could not delete service", input);
      throw new tError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete service",
      });
    }
  });
