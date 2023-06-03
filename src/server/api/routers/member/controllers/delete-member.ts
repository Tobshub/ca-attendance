import { privateProcedure, tError } from "@/server/api/trpc";
import { Ok } from "@/server/utils/result";
import { z } from "zod";

export const DeleteMember = privateProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ input, ctx: { logger, prisma } }) => {
    try {
      const deletedMember = await prisma.member.delete({
        where: { id: input.id },
      });
      logger.info(input, "Deleted Member");
      return Ok(deletedMember);
    } catch (err) {
      logger.error(err, "Could not Delete Member", input);
      throw new tError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete member",
      });
    }
  });
