import pino from "pino";

const LOG = pino();

export const logger = {
  info: <O>(obj: O, msg?: string | undefined, ...args: unknown[]) =>
    LOG.info(obj, msg, ...args),
  error: <E>(obj: E, msg?: string | undefined, ...args: unknown[]) =>
    LOG.error(obj, msg, ...args),
  warn: <W>(obj: W, msg?: string | undefined, ...args: unknown[]) =>
    LOG.warn(obj, msg, ...args),
};
