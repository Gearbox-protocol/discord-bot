import { App } from 'src/app';
import { Message } from 'discord.js';

interface ApplyProps {
  app: App;
  message: Message<boolean>;
  address: string;
}

const apply = ({ app, message, address }: ApplyProps) => {
  app.logger.debug(`Got apply command with address: ${address}`);

  const timeTaken = Date.now() - message.createdTimestamp;
  message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
};

export type { ApplyProps };
export { apply };
