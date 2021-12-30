import { QueryResult } from 'pg';
import { queries } from '../queries';
import type { DbInstance } from '..';

interface Exists {
  exists: boolean;
}

const checkUserInSnapshot = (db: DbInstance) => async (tag: string) => {
  db.logger.debug('Checking user in snapshot...');
  const res: QueryResult<Exists> = await db.pool.query(queries.checkExistenceInUsers, [tag]);
  return res.rows[0].exists;
};

const checkUserInApplied = (db: DbInstance) => async (tag: string) => {
  db.logger.debug('Checking user in applied users...');
  const res: QueryResult<Exists> = await db.pool.query(queries.checkExistenceInAppliedUsers, [tag]);
  return res.rows[0].exists;
};

interface User {
  discordId: string;
  originalDiscordId: string;
  numberInList: number;
  tokens: number;
}

const getUser = (db: DbInstance) => async (tag: string) => {
  db.logger.debug('Getting user...');
  const res: QueryResult<User> = await db.pool.query(queries.getUser, [tag]);
  return res.rows[0];
};

const insertAppliedUser = (db: DbInstance) => async (tag: string, address: string) => {
  db.logger.debug('Inserting user...');
  await db.pool.query(queries.insertToAppliedUsers, [tag, address]);
};

const isReady = (db: DbInstance) => async () => {
  db.logger.debug('Pinging...');
  const res: QueryResult<Exists> = await db.pool.query(queries.userTableExists);
  return res.rows[0].exists;
};

export type { User, Exists };
export { checkUserInSnapshot, checkUserInApplied, insertAppliedUser, isReady, getUser };