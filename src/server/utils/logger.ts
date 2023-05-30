import pino from "pino";

const LOG = pino({ transport: { target: "pino-pretty" } });

export const logger = {
  info: (obj: any, msg?: string | undefined, ...args: unknown[]) => LOG.info(obj, msg, ...args),
  error: (obj: any, msg?: string | undefined, ...args: unknown[]) => LOG.error(obj, msg, ...args),
  warn: (obj: any, msg?: string | undefined, ...args: unknown[]) => LOG.warn(obj, msg, ...args),
};
