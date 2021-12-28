import { App } from 'src/app';
import { UserStatus } from 'src/API/db';
import { utils } from 'ethers';
import { Message } from 'discord.js';
import { replyStatus } from '../anyDm';
import { messages } from './messages';

const { isAddress } = utils;

interface ApplyProps {
  app: App;
  message: Message<boolean>;
  address: string;
}

const apply = ({ app, message, address }: ApplyProps) => {
  app.logger.debug(`Got apply command with address: ${address}`);

  const tag = message.author.tag;
  const status = app.db.checkUser(tag);

  if (status !== UserStatus.IN_SNAPSHOT) {
    replyStatus(message, status);
  } else {
    const addressOk = isAddress(address);
    if (!addressOk) {
      message.reply(messages.wrongAddress);
      return;
    }
    app.db.addUser(tag, address);
    message.reply(messages.success);
  }
};

export type { ApplyProps };
export { apply };
