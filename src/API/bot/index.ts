import { Client, Intents } from 'discord.js';
import { App } from 'src/app';
import { BOT_SECRET_TOKEN } from 'src/config';
import { onMessage } from 'src/API/messages';

interface InitBotProps {
  app: App;
}

const initBot = ({ app }: InitBotProps) => {
  app.logger.debug(`Bot loaded with token: ${BOT_SECRET_TOKEN}`);

  const intents = new Intents(32767);
  const client = new Client({ intents });

  client.on('message', onMessage({ app }));
  client.login(BOT_SECRET_TOKEN);

  app.logger.info('Bot created with token');
  return client;
};

export { initBot };
