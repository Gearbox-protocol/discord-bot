import { Logger } from 'src/API/logger';
import { Pool } from 'pg';
import { connectDb, initTables } from './init';
import { checkUserInSnapshot, checkUserInApplied, insertAppliedUser } from './actions';

interface Database {
  checkUser: (userTag: string) => Promise<UserStatus>;
  addUser: (userTag: string, userAddress: string) => Promise<void>;
}

interface DbInstance {
  pool: Pool;
  logger: Logger;
}

enum UserStatus {
  IN_SNAPSHOT = 'IN_SNAPSHOT',
  NOT_IN_SNAPSHOT = 'NOT_IN_SNAPSHOT',
  APPLIED = 'APPLIED',
}

const checkUser =
  (db: DbInstance): Database['checkUser'] =>
  async (tag: string): Promise<UserStatus> => {
    const userCanApply = await checkUserInSnapshot(db, tag);

    if (!userCanApply) return UserStatus.NOT_IN_SNAPSHOT;

    const applied = await checkUserInApplied(db, tag);

    if (applied) return UserStatus.APPLIED;

    return UserStatus.IN_SNAPSHOT;
  };

const addUser =
  (db: DbInstance): Database['addUser'] =>
  async (tag, address) => {
    await insertAppliedUser(db, tag, address);
  };

const initDb = async (logger: Logger): Promise<Database> => {
  const pool = await connectDb(logger);
  await initTables(pool, logger);

  const db: DbInstance = {
    pool,
    logger,
  };

  logger.info('DB created');
  return {
    checkUser: checkUser(db),
    addUser: addUser(db),
  };
};

export type { Database, DbInstance };
export { initDb, UserStatus };
