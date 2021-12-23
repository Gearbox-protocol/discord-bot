const BOT_SECRET_TOKEN = process.env.BOT_SECRET_KEY;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const APP_PORT = Number(process.env.APP_PORT) || 8000;

export { BOT_SECRET_TOKEN, LOG_LEVEL, APP_PORT };
