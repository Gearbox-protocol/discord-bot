import { Message as DiscordMessage } from 'discord.js';

interface ProperMessageProps {
  author: {
    bot: DiscordMessage['author']['bot'];
  };
  channel: {
    type: DiscordMessage['channel']['type'];
  };
}

const properMessage = (message: ProperMessageProps) => {
  const isBot = message.author.bot;
  const isDm = message.channel.type === 'DM';
  if (isBot || !isDm) return false;
  return true;
};

interface GetTagProps {
  author: {
    tag: DiscordMessage['author']['tag'];
  };
}

const getTag = (message: GetTagProps) => {
  const { tag } = message.author;
  return Buffer.from(tag).toString('base64');
};

interface IsFirstMessageProps {
  channel: {
    messages: { fetch: DiscordMessage['channel']['messages']['fetch'] };
  };
}

const LIMIT = 10;

const firstMessageLimit = { limit: LIMIT };

const isFirstMessage = async (message: IsFirstMessageProps) => {
  const messages = await message.channel.messages.fetch(firstMessageLimit);
  const userMessages = messages.filter((msg) => !msg.author.bot);

  return userMessages.size < 2;
};

const exhaustiveCheck =
  (msg: string) =>
  (arg: never): never => {
    throw new Error(`${msg}${arg}`);
  };

export type { ProperMessageProps, GetTagProps, IsFirstMessageProps };
export { properMessage, getTag, isFirstMessage, exhaustiveCheck, firstMessageLimit };
