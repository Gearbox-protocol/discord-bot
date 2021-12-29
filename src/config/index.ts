const isProduction = process.env.NODE_ENV === 'production';

const BOT_SECRET_TOKEN = process.env.BOT_SECRET_KEY;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const APP_PORT = Number(process.env.APP_PORT) || 8000;

const commandSettings = {
  COMMAND_PREFIX: '!',
  COMMAND_SEPARATOR: ' ',
} as const;

const links = {
  TASKS_LINK: '<here>',
  CONTRIBUTION_LINK: '<here>',
  DETAILS_LINK: '[here]',
} as const;

const dbConfig = {
  PG_USER: process.env.PG_USER,
  PG_PASSWORD: process.env.PG_PASSWORD,
  PG_HOST: process.env.PG_HOST,
  PG_PORT: process.env.PG_PORT,
  PG_DATABASE: process.env.PG_DATABASE,
  DATABASE_URL: process.env.DATABASE_URL,
} as const;

export { BOT_SECRET_TOKEN, LOG_LEVEL, APP_PORT, commandSettings, links, dbConfig, isProduction };
