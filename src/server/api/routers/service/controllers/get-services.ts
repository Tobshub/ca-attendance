import { privateProcedure, tError } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { logger } from "@/server/utils/logger";
import { Ok } from "@/server/utils/result";
import { z } from "zod";

export const GetServices = privateProcedure
  .input(z.object({ cursor: z.number().nullish() }))
  .query(async ({ input }) => {
    try {
      const services = await prisma.service.findMany({
        orderBy: { date: "desc" },
        take: 5,
        cursor: input.cursor ? { id: input.cursor } : undefined,
      });

      logger.info("Fetched services");
      return Ok(services);
    } catch (err) {
      logger.error(err, "Failed to get services");
      throw new tError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get services",
      });
    }
  });
