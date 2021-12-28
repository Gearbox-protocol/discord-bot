import { App } from 'src/app';
import { Message } from 'discord.js';
import { apply } from './commands/apply';
import { anyDm } from './commands/anyDm';
import { unknownCommand } from './commands/unknownCommand';
import { processCommand, properMessage, isCommand } from './helpers';

interface OnMessageProps {
  app: App;
}

type KnownCommands = 'apply';

const onMessage =
  ({ app }: OnMessageProps) =>
  (message: Message<boolean>) => {
    try {
      if (!properMessage(message)) return;

      if (!isCommand(message.content)) {
        anyDm({ app, message });
        return;
      }

      const [command, arg] = processCommand(message.content);

      switch (command) {
        case 'apply': {
          apply({ app, message, address: arg });
          break;
        }
        default:
          unknownCommand({ app, message, command });
          break;
      }
    } catch (e) {
      app.logger.error(e, 'onMessage error');
    }
  };

export type { KnownCommands };
export { onMessage };
