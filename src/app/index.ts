import pino, { Logger } from 'pino';
import { LOG_LEVEL } from 'src/config';

interface App {
  logger: Logger;
}

const initLogger = (): Logger => {
  const logger = pino({ level: LOG_LEVEL });
  logger.debug(`Logger created with level: ${LOG_LEVEL}`);
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
