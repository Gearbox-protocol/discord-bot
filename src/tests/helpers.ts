const tag = '123qwerty👾哈喽#1279';
const tagBase64 = Buffer.from(tag).toString('base64');

const address = '0x9654bA3Ae38e6Fa1fBa4Af58460bdE9F15e770e6';
const wrongAddress = '123';

const addUserResponse = {
  tokens: 1,
  discordId: tagBase64,
  originalDiscordId: tag,
  numberInList: 0,
};

export { tag, tagBase64, address, wrongAddress, addUserResponse };
