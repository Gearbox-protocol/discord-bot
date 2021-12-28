import { App } from 'src/app';
import { Message } from 'discord.js';
import { messages } from './messages';

interface UnknownCommandProps {
  app: App;
  message: Message<boolean>;
  command: string;
}

const unknownCommand = ({ app, message, command }: UnknownCommandProps) => {
  app.logger.debug(`Got unknown command: ${command}`);
  message.reply(messages.unknownCommand);
};

export type { UnknownCommandProps };
export { unknownCommand };
