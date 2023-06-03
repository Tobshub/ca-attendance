import { privateProcedure, tError } from "@/server/api/trpc";
import { Ok } from "@/server/utils/result";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { z } from "zod";

export const NewMember = privateProcedure
  .input(
    z.object({
      name: z.string(),
      phoneNum: z.string().min(9),
      address: z.string().optional(),
      sex: z.enum(["MALE", "FEMALE"]),
    })
  )
  .mutation(async ({ input, ctx: { prisma, logger } }) => {
    try {
      const new_member = await prisma.member.create({
        data: input,
      });
      logger.info({ id: new_member.id }, "Added new member");
      return Ok(new_member);
    } catch (err) {
      logger.error(err, "Failed to add new Member");
      if (err instanceof PrismaClientKnownRequestError) {
        throw new tError({
          code: "CONFLICT",
          message: "Member is already on record",
        });
      } else {
        throw new tError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not add that member",
        });
      }
    }
  });
