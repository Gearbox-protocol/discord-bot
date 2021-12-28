import * as dotenv from 'dotenv';
import { BOT_SECRET_TOKEN, LOG_LEVEL } from 'src/config';
import { initBot } from './API/bot';
import { initLogger } from './API/logger';
import { initApp } from './app';

dotenv.config();

async function main() {
  const logger = initLogger(LOG_LEVEL);

  try {
    const app = await initApp(logger);

    if (!BOT_SECRET_TOKEN) throw new Error('No discord API token');
    await initBot({ app, token: BOT_SECRET_TOKEN });

    app.logger.info('Listening...');
  } catch (e) {
    logger.error(e, 'main error');
  }
}

main();
