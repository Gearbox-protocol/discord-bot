import { Message as DiscordMessage } from 'discord.js';
import { App } from 'src/app';
import { apply } from './commands/apply/apply';
import { anyDm } from './commands/anyDm/anyDm';
import { properMessage, isFirstMessage } from './helpers/helpers';

interface OnMessageProps {
  app: App;
}

type KnownCommands = 'apply';

const onMessage =
  ({ app }: OnMessageProps) =>
  async (message: DiscordMessage) => {
    try {
      if (!properMessage(message)) return;

      const isFirst = await isFirstMessage(message);
      app.logger.debug(`Got message. First time: ${isFirst}`);

      if (isFirst) {
        await anyDm({ app, message });
      } else {
        await apply({ app, message, address: message.content });
      }
    } catch (e) {
      app.logger.error(e, 'onMessage error');
    }
  };

export type { KnownCommands };
export { onMessage };
