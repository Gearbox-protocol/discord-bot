const BOT_SECRET_TOKEN = process.env.BOT_SECRET_KEY;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const APP_PORT = Number(process.env.APP_PORT) || 8000;

const COMMAND_PREFIX = '!' as const;
const COMMAND_SEPARATOR = ' ' as const;

const TASKS_LINK = '<here>' as const;
const CONTRIBUTION_LINK = '<here>' as const;
const DETAILS_LINK = '[here]' as const;

export {
  BOT_SECRET_TOKEN,
  LOG_LEVEL,
  APP_PORT,
  COMMAND_PREFIX,
  COMMAND_SEPARATOR,
  TASKS_LINK,
  CONTRIBUTION_LINK,
  DETAILS_LINK,
};
