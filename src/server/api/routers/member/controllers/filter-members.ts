import { privateProcedure, tError } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { logger } from "@/server/utils/logger";
import { Ok } from "@/server/utils/result";
import { z } from "zod";

export const FilterMembers = privateProcedure
  .input(
    z.object({ name: z.string().optional(), phoneNum: z.string().optional() })
  )
  .query(async ({ input }) => {
    if (!input.name && !input.phoneNum) {
      throw new tError({
        code: "BAD_REQUEST",
        message: "Please specify member name or phone number",
      });
    }

    let members;
    try {
      if (input.name) {
        members = await prisma.member.findMany({
          where: { name: { contains: input.name } },
        });
      } else if (input.phoneNum) {
        members = await prisma.member.findMany({
          where: { phoneNum: { contains: input.phoneNum } },
        });
      }
    } catch (err) {
      logger.error(err, "Could not filter members");
      throw new tError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to filter members",
      });
    }

    if (members) {
      return Ok(members);
    } else {
      /// code should never execute
      throw new tError({
        code: "BAD_REQUEST",
        message: "Something unexpected happened",
      });
    }
  });
