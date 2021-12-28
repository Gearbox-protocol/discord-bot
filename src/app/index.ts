import pino, { Logger } from 'pino';

interface App {
  logger: Logger;
}

const initLogger = (level: string): Logger => {
  const logger = pino({ level });
  logger.debug(`Logger created with level: ${level}`);
  return logger;
};

const initApp = (logger: Logger): App => {
  logger.info('App created');
  return {
    logger,
  };
};

export type { App };
export { initApp, initLogger };
