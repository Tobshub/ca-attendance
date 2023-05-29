import { privateProcedure, tError } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { logger } from "@/server/utils/logger";
import { Ok } from "@/server/utils/result";
import { z } from "zod";

export const NewService = privateProcedure
  .input(z.object({ date: z.date(), name: z.string() }))
  .mutation(async ({ input }) => {
    try {
      const new_service = await prisma.service.create({
        data: { date: input.date, name: input.name },
      });

      logger.info("Created new service");
      return Ok(new_service);
    } catch (err) {
      logger.error(err, "Failed to create service");
      throw new tError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create service",
      });
    }
  });
