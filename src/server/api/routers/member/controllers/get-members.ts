import { privateProcedure, tError } from "@/server/api/trpc";
import { Ok } from "@/server/utils/result";
import { z } from "zod";

export const GetMembers = privateProcedure
  .input(z.object({ cursor: z.number().nullish() }))
  .query(async ({ input, ctx: { prisma, logger } }) => {
    try {
      const members = await prisma.member.findMany({
        // FIXIT: take only 30 a time
        cursor: input.cursor ? { id: input.cursor } : undefined,
        include: { present: { orderBy: { date: "desc" }, take: 4 } },
      });
      logger.info("Got members");
      return Ok(members);
    } catch (err) {
      logger.error(err, "Failed to get members");
      throw new tError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not get members",
      });
    }
  });
