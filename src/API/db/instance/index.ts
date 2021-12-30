import { Pool } from 'pg';
import { Logger } from 'src/API/logger';
import { initTables, connectDb, DbConfig } from './init/init';
import {
  checkUserInSnapshot,
  checkUserInApplied,
  insertAppliedUser,
  isReady,
  getUser,
  User,
} from './actions';

interface DbInstance {
  pool: Pool;
  logger: Logger;
}

interface DbInterface {
  instance: DbInstance;
  actions: {
    checkUserInSnapshot: (tag: string) => Promise<boolean>;
    checkUserInApplied: (tag: string) => Promise<boolean>;
    insertAppliedUser: (tag: string, address: string) => Promise<void>;
    getUser: (tag: string) => Promise<User>;
    isReady: () => Promise<boolean>;
  };
}

const createDbInstance = async (logger: Logger, config: DbConfig): Promise<DbInterface> => {
  const pool = await connectDb(logger, config);
  await initTables(pool, logger);

  const instance: DbInstance = {
    pool,
    logger,
  };

  return {
    instance,
    actions: {
      checkUserInSnapshot: checkUserInSnapshot(instance),
      checkUserInApplied: checkUserInApplied(instance),
      insertAppliedUser: insertAppliedUser(instance),
      getUser: getUser(instance),
      isReady: isReady(instance),
    },
  };
};

export type { DbInstance, DbInterface, DbConfig };
export { createDbInstance };
