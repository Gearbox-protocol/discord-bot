import { App } from 'src/app';
import { UserStatus } from 'src/API/db';
import { Message } from 'discord.js';
import { messages } from './messages';

interface AnyDmProps {
  app: App;
  message: Message<boolean>;
}

const replyStatus = (message: Message<boolean>, status: UserStatus) => {
  switch (status) {
    case UserStatus.IN_SNAPSHOT:
      message.reply(messages.inSnapshot);
      return;
    case UserStatus.NOT_IN_SNAPSHOT:
      message.reply(messages.notInSnapshot);
      return;
    case UserStatus.APPLIED:
      message.reply(messages.applied);
      return;
    default:
  }
};

const anyDm = ({ app, message }: AnyDmProps) => {
  const tag = message.author.tag;
  app.logger.debug(`Got a DM from: ${tag}`);

  const status = app.db.checkUser(tag);

  replyStatus(message, status);
};

export type { AnyDmProps };
export { anyDm, replyStatus };
