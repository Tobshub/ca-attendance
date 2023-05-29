import { privateProcedure, tError } from "@/server/api/trpc";
import { logger } from "@/server/utils/logger";
import { Ok } from "@/server/utils/result";
import { z } from "zod";

export const MarkMember = privateProcedure
  .input(z.object({ id: z.number(), service_id: z.number() }))
  .mutation(async ({ input, ctx }) => {
    try {
      const member = await ctx.prisma.member.update({
        where: { id: input.id },
        data: { present: { connect: { id: input.service_id } } },
      });
      logger.info(input, "Marked member's attendance");
      return Ok(member);
    } catch (err) {
      logger.error(err, "Failed to mark member's attendance", input);
      throw new tError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not mark member's attendance",
      });
    }
  });

export const UnMarkMember = privateProcedure
  .input(z.object({ id: z.number(), service_id: z.number() }))
  .mutation(async ({ input, ctx }) => {
    try {
      const member = await ctx.prisma.member.update({
        where: { id: input.id },
        data: { present: { disconnect: { id: input.service_id } } },
      });
      logger.info(input, "Unmarked member's attendance");
      return Ok(member);
    } catch (err) {
      logger.error(err, "Failed to unmark member's attendance", input);
      throw new tError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not unmark member's attendance",
      });
    }
  });
