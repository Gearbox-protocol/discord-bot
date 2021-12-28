import { App } from 'src/app';
import { Message } from 'discord.js';

interface UnknownCommandProps {
  app: App;
  message: Message<boolean>;
  command: string;
}

const unknownCommand = ({ app, message, command }: UnknownCommandProps) => {
  app.logger.debug(`Got unknown command: ${command}`);
  message.reply('Unknown command');
};

export type { UnknownCommandProps };
export { unknownCommand };
