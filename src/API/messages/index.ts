import { App } from 'src/app';
import { Message } from 'discord.js';
import { COMMAND_PREFIX, COMMAND_SEPARATOR } from 'src/config';

interface OnMessageProps {
  app: App;
}

const onMessage =
  ({ app }: OnMessageProps) =>
  (message: Message<boolean>) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(COMMAND_PREFIX)) return;

    const commandBody = message.content.slice(COMMAND_PREFIX.length);
    const args = commandBody.split(COMMAND_SEPARATOR);
    const command = (args.shift() || '').toLowerCase();

    if (command === 'ping') {
      app.logger.debug('Got ping command');
      const timeTaken = Date.now() - message.createdTimestamp;
      message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }
  };

export { onMessage };
