import { Message as DiscordMessage } from 'discord.js';
import { App } from 'src/app';
import { address } from './commands/address';
import { anyDm } from './commands/anyDm';
import { properMessage, isFirstMessage } from './helpers';

interface OnMessageProps {
  app: App;
}

type KnownCommands = 'address';

const onMessage =
  ({ app }: OnMessageProps) =>
  async (message: DiscordMessage) => {
    try {
      if (!properMessage(message)) return;

      const isFirst = await isFirstMessage(message);
      app.logger.debug(`Got message. First time: ${isFirst}`);

      if (isFirst) {
        anyDm({ app, message });
      } else {
        address({ app, message, address: message.content });
      }
    } catch (e) {
      app.logger.error(e, 'onMessage error');
    }
  };

export type { KnownCommands };
export { onMessage };
