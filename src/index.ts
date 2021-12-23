import * as dotenv from 'dotenv';
import pino from 'pino';
import { Client, Intents, Message } from 'discord.js';
import {
  BOT_SECRET_TOKEN,
  LOG_LEVEL,
  APP_PORT,
  COMMAND_PREFIX,
  COMMAND_SEPARATOR,
} from 'src/config';

dotenv.config();

const logger = pino({ level: LOG_LEVEL });

const onMessage = (message: Message<boolean>) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(COMMAND_PREFIX)) return;

  const commandBody = message.content.slice(COMMAND_PREFIX.length);
  const args = commandBody.split(COMMAND_SEPARATOR);
  const command = (args.shift() || '').toLowerCase();

  if (command === 'ping') {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    logger.debug(`Got ping command`);
  }
};

const initBot = () => {
  const intents = new Intents(32767);
  const client = new Client({ intents });

  client.on('message', onMessage);

  client.login(BOT_SECRET_TOKEN);

  return client;
};

function main() {
  logger.debug(`Loaded with token: ${BOT_SECRET_TOKEN}`);
  logger.debug(`Loaded with port: ${APP_PORT}`);

  initBot();
  logger.debug(`Listening...`);
}

main();
