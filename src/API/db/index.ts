import { Logger } from 'src/API/logger';
import { createDbInstance, DbInterface, DbConfig } from './instance';
import { checkUser, addUser, UserStatus } from './handlers';

interface Database {
  checkUser: (userTag: string) => Promise<UserStatus>;
  addUser: (userTag: string, userAddress: string) => Promise<void>;
}

const initDb = async (logger: Logger, config: DbConfig): Promise<Database> => {
  const db = await createDbInstance(logger, config);
  logger.info('DB created');

  return {
    checkUser: checkUser(db),
    addUser: addUser(db),
  };
};

export type { Database, DbInterface, DbConfig };
export { initDb, UserStatus };
