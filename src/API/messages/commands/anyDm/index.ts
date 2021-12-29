import { Message as DiscordMessage } from 'discord.js';
import { App } from 'src/app';
import { UserStatus } from 'src/API/db';
import { messages } from './messages';

interface AnyDmProps {
  app: App;
  message: DiscordMessage;
}

const replyOnStatus = (message: DiscordMessage, status: UserStatus) => {
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

const anyDm = async ({ app, message }: AnyDmProps) => {
  const tag = message.author.tag;
  app.logger.debug(`Got a DM from: ${tag}`);

  const status = await app.db.checkUser(tag);

  replyOnStatus(message, status);
};

export type { AnyDmProps };
export { anyDm, replyOnStatus };
