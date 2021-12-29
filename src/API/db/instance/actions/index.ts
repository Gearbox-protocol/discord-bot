import { QueryResult } from 'pg';
import { queries } from '../queries';
import { DbInstance } from '../';

interface UserExists {
  exists: boolean;
}

const checkUserInSnapshot = (db: DbInstance) => async (tag: string) => {
  db.logger.debug('Checking user in snapshot...');
  const res: QueryResult<UserExists> = await db.pool.query(queries.checkExistenceInUsers, [tag]);
  return res.rows[0].exists;
};

const checkUserInApplied = (db: DbInstance) => async (tag: string) => {
  db.logger.debug('Checking user in applied users...');
  const res: QueryResult<UserExists> = await db.pool.query(queries.checkExistenceInAppliedUsers, [
    tag,
  ]);
  return res.rows[0].exists;
};

const insertAppliedUser = (db: DbInstance) => async (tag: string, address: string) => {
  db.logger.debug('Inserting user...');
  const res = await db.pool.query(queries.insertToAppliedUsers, [tag, address]);
  return res;
};

export { checkUserInSnapshot, checkUserInApplied, insertAppliedUser };
