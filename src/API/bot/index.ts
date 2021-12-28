import { Client, Intents, ClientOptions } from 'discord.js';
import { App } from 'src/app';
import { BOT_SECRET_TOKEN } from 'src/config';
import { onMessage } from 'src/API/messages';

const allIntents = new Intents(32767);

const botConfig: ClientOptions = {
  intents: allIntents,
  partials: ['CHANNEL'],
};

interface InitBotProps {
  app: App;
}

const initBot = async ({ app }: InitBotProps) => {
  const client = new Client(botConfig);

  client.on('messageCreate', onMessage({ app }));

  await client.login(BOT_SECRET_TOKEN);
  app.logger.debug(`Bot logged in with token: ${BOT_SECRET_TOKEN}`);

  app.logger.info('Bot created');
  return client;
};

export { initBot };
