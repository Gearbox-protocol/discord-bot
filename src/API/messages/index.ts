import { App } from 'src/app';
import { Message } from 'discord.js';
import { COMMAND_PREFIX } from 'src/config';
import { isApplyCommand, apply } from './commands/apply';
import { anyDm } from './commands/anyDM';
import { unknownCommand } from './commands/unknownCommand';
import { processCommand, properMessage } from './helpers';

interface OnMessageProps {
  app: App;
}

const onMessage =
  ({ app }: OnMessageProps) =>
  (message: Message<boolean>) => {
    try {
      if (!properMessage(message)) return;

      if (!message.content.startsWith(COMMAND_PREFIX)) {
        anyDm({ app, message });
        return;
      }

      const [command, arg] = processCommand(message.content);

      switch (true) {
        case isApplyCommand(command): {
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

export { onMessage };
