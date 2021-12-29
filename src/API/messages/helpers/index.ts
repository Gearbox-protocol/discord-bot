import { commandSettings } from 'src/config';
import { Message as DiscordMessage } from 'discord.js';

const processCommand = (messageBody: string) => {
  const commandBody = messageBody.slice(commandSettings.COMMAND_PREFIX.length);
  const [command, arg] = commandBody.split(commandSettings.COMMAND_SEPARATOR, 2);

  return [command.toLowerCase(), arg];
};

const properMessage = (message: DiscordMessage) => {
  const isBot = message.author.bot;
  const isDm = message.channel.type === 'DM';
  if (isBot || !isDm) return false;
  return true;
};

const isCommand = (messageBody: string) => messageBody.startsWith(commandSettings.COMMAND_PREFIX);

export { processCommand, properMessage, isCommand };
