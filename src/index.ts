import * as dotenv from 'dotenv';
import { initBot } from './API/bot';
import { initApp } from './app';

dotenv.config();

async function main() {
  const app = initApp();
  await initBot({ app });

  app.logger.info('Listening...');
}

main();
