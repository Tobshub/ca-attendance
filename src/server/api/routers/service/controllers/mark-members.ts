import { privateProcedure, tError } from "@/server/api/trpc";
import { Err, Ok } from "@/server/utils/result";
import { z } from "zod";

export const MarkMembersForService = privateProcedure
  .input(z.object({ id: z.number(), members: z.number().array() }))
  .mutation(async ({ input, ctx: { prisma, logger } }) => {
    let full_success = true;
    for (let member_id of input.members) {
      try {
        await prisma.service.update({
          where: { id: input.id },
          data: { present: { connect: { id: member_id } } },
        });
      } catch (err) {
        if (full_success) full_success = false;
        logger.error(err, "Could not connect member to service", {
          service_id: input.id,
          member_id,
        });
      }
    }
    logger.info("Connected members to service");
    return full_success ? Ok({}) : Err("Some actions failed. Please reload");
  });

export const UnMarkMembersForService = privateProcedure
  .input(z.object({ id: z.number(), members: z.number().array() }))
  .mutation(async ({ input, ctx: { prisma, logger } }) => {
    let full_success = true;
    for (let member_id of input.members) {
      try {
        await prisma.service.update({
          where: { id: input.id },
          data: { present: { disconnect: { id: member_id } } },
        });
      } catch (err) {
        if (full_success) full_success = false;
        logger.error(err, "Could not disconnect member from service", {
          service_id: input.id,
          member_id,
        });
      }
    }
    logger.info("Disconnected members from service");
    return full_success ? Ok({}) : Err("Some actions failed. Please reload");
  });
