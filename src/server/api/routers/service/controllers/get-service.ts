import { privateProcedure, tError } from "@/server/api/trpc";
import { Err, Ok } from "@/server/utils/result";
import { z } from "zod";

export const GetOneService = privateProcedure
  .input(z.object({ id: z.number().nullish(), date: z.date().nullish() }))
  .query(async ({ input, ctx: { logger, prisma } }) => {
    if (!input.id && !input.date) {
      throw new tError({
        code: "BAD_REQUEST",
        message: "Specify either service ID or service Date",
      });
    }
    try {
      let service;
      if (input.id) {
        service = await prisma.service.findUnique({
          where: { id: input.id },
        });
      } else if (input.date) {
        service = await prisma.service.findUnique({
          where: { date: input.date },
        });
      }

      if (service) {
        logger.info(input, "Service found");
        return Ok(service);
      } else {
        logger.info(input, "Service not found");
        return Err(service);
      }
    } catch (err) {
      logger.error(err, "Failed to get service", input);
      throw new tError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not get that service",
      });
    }
  });
