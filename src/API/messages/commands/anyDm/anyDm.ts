import { Message as DiscordMessage } from 'discord.js';
import { App } from 'src/app';
import { UserStatus } from 'src/API/db';
import { getTag, exhaustiveCheck, GetTagProps } from '../../helpers/helpers';
import { messages } from './messages';

const checkStatus = exhaustiveCheck('Wrong user status: ');

interface ReplyOnStatusProps {
  reply: DiscordMessage['reply'];
}

const replyOnStatus = (message: ReplyOnStatusProps, status: UserStatus) => {
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
      checkStatus(status);
  }
};

interface AnyDmProps {
  app: App;
  message: GetTagProps & ReplyOnStatusProps;
}

const anyDm = async ({ app, message }: AnyDmProps) => {
  const tag = getTag(message);
  app.logger.debug(`Got a DM from: ${tag}`);

  const status = await app.db.checkUser(tag);

  replyOnStatus(message, status);
};

export type { AnyDmProps, ReplyOnStatusProps };
export { anyDm, replyOnStatus };
