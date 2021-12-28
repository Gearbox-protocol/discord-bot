import { QueryResult } from 'pg';
import { DbInstance } from '../';

const selectUser = `
SELECT EXISTS (
    SELECT 1 FROM users WHERE discordId=$1
)`;

interface UserExists {
  exists: boolean;
}

const checkUserInSnapshot = async (db: DbInstance, tag: string) => {
  db.logger.debug('Checking user in snapshot...');
  const res: QueryResult<UserExists> = await db.pool.query(selectUser, [tag]);
  return res.rows[0].exists;
};

const selectAppliedUser = `
SELECT EXISTS (
    SELECT 1 FROM users_applied WHERE discordId=$1
)`;

const checkUserInApplied = async (db: DbInstance, tag: string) => {
  db.logger.debug('Checking user in applied users...');
  const res: QueryResult<UserExists> = await db.pool.query(selectAppliedUser, [tag]);
  return res.rows[0].exists;
};

const insertUser = `INSERT INTO users_applied (discordId, address) VALUES($1, $2);`;

const insertAppliedUser = async (db: DbInstance, tag: string, address: string) => {
  db.logger.debug('Inserting user...');
  const res = await db.pool.query(insertUser, [tag, address]);
  return res;
};

export { checkUserInSnapshot, checkUserInApplied, insertAppliedUser };
