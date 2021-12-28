import { Logger } from 'src/API/logger';
import { Pool, QueryResult } from 'pg';

const connectDb = async (logger: Logger): Promise<Pool> => {
  const isProduction = process.env.NODE_ENV === 'production';
  const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

  const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  return pool;
};

const insertUserQuery = 'INSERT INTO users (discordId, tokens) VALUES($1, $2);';
const testUser = ['blizzz93#1279', 30000];

const insertUser = async (pool: Pool) => {
  await pool.query(insertUserQuery, testUser);
};

const usersTable = `
CREATE TABLE IF NOT EXISTS users (
    discordId TEXT NOT NULL PRIMARY KEY,
    tokens INTEGER NOT NULL
)`;

const appliedUsersTable = `
CREATE TABLE IF NOT EXISTS users_applied (
    discordId TEXT NOT NULL PRIMARY KEY REFERENCES users (discordId),
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)`;

interface UserCount {
  count: string;
}

const countUsers = async (pool: Pool) => {
  const res: QueryResult<UserCount> = await pool.query(`SELECT count(*) FROM users`);
  return Number(res.rows[0].count);
};

const initTables = async (pool: Pool, logger: Logger) => {
  await pool.query(`${usersTable}; ${appliedUsersTable}`);

  const count = await countUsers(pool);
  logger.debug(`Users count: ${count}`);

  if (count === 0) {
    logger.debug(`Inserting users...`);
    await insertUser(pool);
  }
};

export { connectDb, initTables };
