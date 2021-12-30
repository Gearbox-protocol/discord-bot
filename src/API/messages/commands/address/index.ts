import { utils } from 'ethers';
import { App } from 'src/app';
import { UserStatus } from 'src/API/db';
import { Message as DiscordMessage } from 'discord.js';
import { replyOnStatus } from '../anyDm';
import { getTag } from '../../helpers';
import { messages } from './messages';

const { isAddress } = utils;

interface ApplyProps {
  app: App;
  message: DiscordMessage;
  address: string;
}

const address = async ({ app, message, address: userAddress }: ApplyProps) => {
  app.logger.debug(`Got address command with address: ${userAddress}`);

  const tag = getTag(message);
  const status = await app.db.checkUser(tag);

  if (status !== UserStatus.IN_SNAPSHOT) {
    replyOnStatus(message, status);
  } else {
    const addressOk = isAddress(userAddress);
    if (!addressOk) {
      message.reply(messages.wrongAddress);
      return;
    }
    await app.db.addUser(tag, userAddress);
    message.reply(messages.success);
  }
};

export type { ApplyProps };
export { address };
