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

const getTag = (message: DiscordMessage) => {
  const { tag } = message.author;
  return Buffer.from(tag).toString('base64');
};

const isFirstMessage = async (message: DiscordMessage) => {
  const messages = await message.channel.messages.fetch({ limit: 99 });
  const userMessages = messages.filter((msg) => {
    if (msg.author.bot) {
      msg.delete();
    }
    return !msg.author.bot;
  });

  return userMessages.size < 2;
};

const isCommand = (messageBody: string) => messageBody.startsWith(commandSettings.COMMAND_PREFIX);

const exhaustiveCheck =
  (msg: string) =>
  (arg: never): never => {
    throw new Error(`${msg}${arg}`);
  };

export { processCommand, properMessage, isCommand, getTag, isFirstMessage, exhaustiveCheck };
