import { COMMAND_PREFIX, COMMAND_SEPARATOR } from 'src/config';
import type { Message } from '../';

const processCommand = (messageBody: string) => {
  const commandBody = messageBody.slice(COMMAND_PREFIX.length);
  const [command, arg] = commandBody.split(COMMAND_SEPARATOR, 2);

  return [command.toLowerCase(), arg];
};

const properMessage = (message: Message) => {
  const isBot = message.author.bot;
  const isDm = message.channel.type === 'DM';
  if (isBot || !isDm) return false;
  return true;
};

const isCommand = (messageBody: string) => messageBody.startsWith(COMMAND_PREFIX);

export { processCommand, properMessage, isCommand };
