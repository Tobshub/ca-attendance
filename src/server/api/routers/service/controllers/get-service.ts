import { privateProcedure, tError } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { logger } from "@/server/utils/logger";
import { Err, Ok } from "@/server/utils/result";
import { z } from "zod";

export const GetOneService = privateProcedure
  .input(z.object({ id: z.number().nullish(), date: z.date().nullish() }))
  .query(async ({ input }) => {
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
        logger.info("Service found", input);
        return Ok(service);
      } else {
        logger.info("Service not found", input);
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
