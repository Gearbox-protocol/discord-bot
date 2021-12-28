import { App } from 'src/app';
import { Message } from 'discord.js';

interface AnyDmProps {
  app: App;
  message: Message<boolean>;
}

const anyDm = ({ app, message }: AnyDmProps) => {
  app.logger.debug('Got a Dm message');

  message.reply(`Thanks for Dm`);
};

export type { AnyDmProps };
export { anyDm };
