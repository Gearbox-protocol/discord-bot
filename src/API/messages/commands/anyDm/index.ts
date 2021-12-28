import { App } from 'src/app';
import { Message } from 'discord.js';
import { messages } from './messages';

interface AnyDmProps {
  app: App;
  message: Message<boolean>;
}

const anyDm = ({ app, message }: AnyDmProps) => {
  app.logger.debug('Got a Dm message');

  message.reply(messages.canApply);
};

export type { AnyDmProps };
export { anyDm };
