import * as dotenv from 'dotenv';
import { initBot } from './API/bot';
import { initApp, initLogger } from './app';

dotenv.config();

async function main() {
  const logger = initLogger();

  try {
    const app = initApp(logger);
    await initBot({ app });

    app.logger.info('Listening...');
  } catch (e) {
    logger.error(e, 'main error');
  }
}

main();
