import { privateProcedure, tError } from "@/server/api/trpc";
import { Ok } from "@/server/utils/result";
import { z } from "zod";

export const GetServices = privateProcedure
  .input(
    z.object({ cursor: z.number().nullish(), limit: z.number().optional() })
  )
  .query(async ({ input, ctx: { prisma, logger } }) => {
    try {
      const services = await prisma.service.findMany({
        orderBy: { date: "desc" },
        take: input.limit ?? 5,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        include: { present: { select: { id: true } } },
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
