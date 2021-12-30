import 'jest';
import { mockDeep } from 'jest-mock-extended';
import {
  properMessage,
  ProperMessageProps,
  getTag,
  GetTagProps,
  isFirstMessage,
  firstMessageLimit,
  IsFirstMessageProps,
} from './helpers';

describe('Message helpers', () => {
  describe('properMessage', () => {
    it('should ignore bots', async () => {
      const msg: ProperMessageProps = { author: { bot: true }, channel: { type: 'DM' } };
      expect(properMessage(msg)).toEqual(false);
    });
    it('should only reply DM', async () => {
      const msg: ProperMessageProps = { author: { bot: false }, channel: { type: 'GUILD_TEXT' } };
      expect(properMessage(msg)).toEqual(false);
    });
    it('should fail if both wrong', async () => {
      const msg: ProperMessageProps = { author: { bot: true }, channel: { type: 'GUILD_TEXT' } };
      expect(properMessage(msg)).toEqual(false);
    });
    it('should not fail', async () => {
      const msg: ProperMessageProps = { author: { bot: false }, channel: { type: 'DM' } };
      expect(properMessage(msg)).toEqual(true);
    });
  });
  describe('getTag', () => {
    it('should return base64 tag', async () => {
      const tag = 'blizzz93👾哈喽#1279';
      const msg: GetTagProps = { author: { tag: 'blizzz93👾哈喽#1279' } };

      expect(getTag(msg)).toEqual(Buffer.from(tag).toString('base64'));
    });
  });
  describe('isFirstMessage', () => {
    it('should return true when filtered size < 2', async () => {
      const msg = mockDeep<IsFirstMessageProps>();

      const promise = Promise.resolve({
        filter: () => ({
          size: 1,
        }),
      });

      msg.channel.messages.fetch.calledWith(firstMessageLimit).mockReturnValue(promise as any);

      const isFirst = await isFirstMessage(msg);

      expect(isFirst).toEqual(true);
    });
    it('should return false when filtered size >= 2', async () => {
      const msg = mockDeep<IsFirstMessageProps>();

      const promise = Promise.resolve({
        filter: () => ({
          size: 2,
        }),
      });

      msg.channel.messages.fetch.calledWith(firstMessageLimit).mockReturnValue(promise as any);

      const isFirst = await isFirstMessage(msg);

      expect(isFirst).toEqual(false);
    });
  });
});
