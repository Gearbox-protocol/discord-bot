import { Logger } from 'src/API/logger';
import { initDb, Database } from 'src/API/db';

interface App {
  logger: Logger;
  db: Database;
}

const initApp = (logger: Logger): App => {
  const db = initDb(logger);

  logger.info('App created');
  return {
    logger,
    db,
  };
};

export type { App };
export { initApp };
