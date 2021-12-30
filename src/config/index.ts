const isProduction = process.env.NODE_ENV === 'production';

const BOT_SECRET_TOKEN = process.env.BOT_SECRET_KEY;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const PORT = Number(process.env.PORT) || 8000;

const commandSettings = {
  COMMAND_PREFIX: '!',
  COMMAND_SEPARATOR: ' ',
} as const;

const links = {
  TASKS_LINK: '<here>',
  CONTRIBUTION_LINK: '<here>',
  DETAILS_LINK: '[here]',
} as const;

const { DATABASE_URL } = process.env;

export { BOT_SECRET_TOKEN, LOG_LEVEL, PORT, commandSettings, links, DATABASE_URL, isProduction };
