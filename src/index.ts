import * as dotenv from 'dotenv';
import { initBot } from './API/bot';
import { initApp } from './app';

dotenv.config();

function main() {
  const app = initApp();
  initBot({ app });

  app.logger.debug('Listening...');
}

main();
