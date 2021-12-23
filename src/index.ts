import * as dotenv from 'dotenv';
import pino from 'pino';
import { BOT_SECRET_TOKEN, LOG_LEVEL, APP_PORT } from 'src/config';

dotenv.config();

const logger = pino({ level: LOG_LEVEL });

function main() {
  logger.debug(`Loaded with token: ${BOT_SECRET_TOKEN}`);
  logger.debug(`Loaded with port: ${APP_PORT}`);
}

main();
