import * as dotenv from 'dotenv';
import { BOT_SECRET_TOKEN, LOG_LEVEL, PORT, dbConfig, isProduction } from 'src/config';
import { initBot } from './API/bot';
import { initLogger } from './API/logger';
import { initApp } from './app';
import { initServer } from './server';

dotenv.config();

async function main() {
  const logger = initLogger(LOG_LEVEL);

  try {
    const app = await initApp({
      logger,
      dbConfig: {
        user: dbConfig.PG_USER,
        password: dbConfig.PG_PASSWORD,
        host: dbConfig.PG_HOST,
        port: dbConfig.PG_PORT,
        database: dbConfig.PG_DATABASE,
        databaseUrl: dbConfig.DATABASE_URL,
        isProduction,
      },
    });

    if (!BOT_SECRET_TOKEN) throw new Error('No discord API token');
    const client = await initBot({ app, token: BOT_SECRET_TOKEN });

    const server = initServer({ app, client });
    server.listen(PORT);
    app.logger.info('Listening...');
  } catch (e) {
    logger.error(e, 'main error');
  }
}

main();
