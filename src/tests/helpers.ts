const tag = 'blizzz93👾哈喽#1279';
const tagBase64 = Buffer.from(tag).toString('base64');

const address = '0xf13df765f3047850Cede5aA9fDF20a12A75f7F70';
const wrongAddress = '123';

const addUserResponse = {
  tokens: 1,
  discordId: tagBase64,
  originalDiscordId: tag,
  numberInList: 0,
};

export { tag, tagBase64, address, wrongAddress, addUserResponse };
