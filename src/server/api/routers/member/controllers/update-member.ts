import { privateProcedure, tError } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { logger } from "@/server/utils/logger";
import { Ok } from "@/server/utils/result";
import { z } from "zod";

export const UpdateMember = privateProcedure
  .input(
    z.object({
      id: z.number(),
      data: z.object({
        name: z.string().optional(),
        phoneNum: z.string().optional(),
        address: z.string().optional(),
        sex: z.enum(["MALE", "FEMALE"]).optional(),
      }),
    })
  )
  .mutation(async ({ input }) => {
    try {
      const updated_member = await prisma.member.update({
        where: { id: input.id },
        data: input.data,
      });
      logger.info({ id: input.id }, "Updated member");
      return Ok(updated_member);
    } catch (err) {
      logger.error(err, "Failed to update member");
      throw new tError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not update member",
      });
    }
  });
