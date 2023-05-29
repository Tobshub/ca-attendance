import { privateProcedure, tError } from "@/server/api/trpc";
import { Ok } from "@/server/utils/result";
import { z } from "zod";

export const GetOneMember = privateProcedure
  .input(z.object({ id: z.number() }))
  .query(async ({ input, ctx: { prisma, logger } }) => {
    let member;
    try {
      member = await prisma.member.findUnique({
        where: { id: input.id },
      });
    } catch (err) {
      logger.error(err, "Failed to get member");
      throw new tError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not get member",
      });
    }
    if (member) {
      logger.info(input, "Found Member");
      return Ok(member);
    } else {
      logger.error(input, "Member not found");
      throw new tError({ code: "NOT_FOUND", message: "Could not find member" });
    }
  });
