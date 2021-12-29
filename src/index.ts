import * as dotenv from 'dotenv';
import { BOT_SECRET_TOKEN, LOG_LEVEL, dbConfig, isProduction } from 'src/config';
import { initBot } from './API/bot';
import { initLogger } from './API/logger';
import { initApp } from './app';
import http from 'http';

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
    await initBot({ app, token: BOT_SECRET_TOKEN });

    const host = '0.0.0.0';
    const port = process.env.PORT || 3000;
    http.createServer().listen(port);

    app.logger.info('Listening...');
  } catch (e) {
    logger.error(e, 'main error');
  }
}

main();
