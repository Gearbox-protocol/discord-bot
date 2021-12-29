import { Pool } from 'pg';
import { Logger } from 'src/API/logger';
import { initTables, connectDb, DbConfig } from './init';
import { checkUserInSnapshot, checkUserInApplied, insertAppliedUser } from './actions';

interface DbInstance {
  pool: Pool;
  logger: Logger;
}

interface DbInterface {
  instance: DbInstance;
  actions: {
    checkUserInSnapshot: (tag: string) => Promise<boolean>;
    checkUserInApplied: (tag: string) => Promise<boolean>;
    insertAppliedUser: (tag: string, address: string) => void;
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
    },
  };
};

export type { DbInstance, DbInterface, DbConfig };
export { createDbInstance };