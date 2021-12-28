import { App } from 'src/app';
import { Message as DiscordMessage } from 'discord.js';
import { apply } from './commands/apply';
import { anyDm } from './commands/anyDm';
import { processCommand, properMessage } from './helpers';

interface OnMessageProps {
  app: App;
}

type KnownCommands = 'apply';

type Message = DiscordMessage;

const onMessage =
  ({ app }: OnMessageProps) =>
  (message: Message) => {
    try {
      if (!properMessage(message)) return;

      const [command, arg] = processCommand(message.content);

      switch (command) {
        case 'apply': {
          apply({ app, message, address: arg });
          break;
        }
        default:
          anyDm({ app, message });
          break;
      }
    } catch (e) {
      app.logger.error(e, 'onMessage error');
    }
  };

export type { KnownCommands, Message };
export { onMessage };
