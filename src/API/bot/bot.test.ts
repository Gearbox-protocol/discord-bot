import 'jest';
import { mockDeep } from 'jest-mock-extended';
import { App } from 'src/app';
import { BOT_SECRET_TOKEN } from 'src/config';
import { initBot } from '.';

describe('Bot', () => {
  const app = mockDeep<App>();
  it('should not init without token', async () => {
    await expect(initBot({ app, token: '' })).rejects.toThrowError();
  });
  it('should init with env token', async () => {
    await expect(initBot({ app, token: BOT_SECRET_TOKEN || '' })).resolves.not.toThrowError();
  });
});
