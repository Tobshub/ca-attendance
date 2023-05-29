import jwt from "jsonwebtoken";
import { env } from "@/env.mjs";
import { Err, Ok } from "./result";
import { logger } from "./logger";

const jwtSecret = env.JWT_SECRET;

export const AuthToken = {
  generate: (payload: string) => {
    try {
      const token = jwt.sign(payload, jwtSecret);
      return Ok(token);
    } catch (error) {
      logger.error(error, "Failed to generate token");
      return Err({});
    }
  },
  verify: (token: string) => {
    try {
      const isValid = jwt.verify(token, jwtSecret) as string;
      if (isValid) {
        return Ok(isValid);
      } else {
        throw new Error("UNEXPECTED");
      }
    } catch (error) {
      logger.error(error, "Failed to verify token");
      return Err("Invalid Token");
    }
  },
};
