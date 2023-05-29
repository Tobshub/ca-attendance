import pino from "pino";

const LOG = pino({ transport: { target: "pino-pretty" } });

export const logger = {
  info: (obj: any, msg?: any, ...args: any[]) => LOG.info(obj, msg, ...args),
  error: (obj: any, msg?: any, ...args: any[]) => LOG.error(obj, msg, ...args),
  warn: (obj: any, msg?: any, ...args: any[]) => LOG.warn(obj, msg, ...args),
};
