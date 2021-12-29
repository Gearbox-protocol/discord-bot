import { Message as DiscordMessage } from 'discord.js';
import { App } from 'src/app';
import { apply } from './commands/apply';
import { anyDm } from './commands/anyDm';
import { processCommand, properMessage } from './helpers';

interface OnMessageProps {
  app: App;
}

type KnownCommands = 'apply';

const onMessage =
  ({ app }: OnMessageProps) =>
  async (message: DiscordMessage) => {
    try {
      if (!properMessage(message)) return;

      const [command, arg] = processCommand(message.content);

      switch (command) {
        case 'apply': {
          await apply({ app, message, address: arg });
          break;
        }
        default:
          await anyDm({ app, message });
          break;
      }
    } catch (e) {
      app.logger.error(e, 'onMessage error');
    }
  };

export type { KnownCommands };
export { onMessage };
