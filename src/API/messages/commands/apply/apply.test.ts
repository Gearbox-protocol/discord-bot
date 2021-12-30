import 'jest';
import { mockDeep } from 'jest-mock-extended';
import { tag, tagBase64, wrongAddress, address, addUserResponse } from 'src/tests/helpers';
import { UserStatus } from 'src/API/db';
import { apply, ApplyProps } from './apply';
import { messages as anyDmMessages } from '../anyDm/messages';
import { messages } from './messages';

describe('Adress', () => {
  describe('address', () => {
    it('should give hello message if user cant apply', async () => {
      const props = mockDeep<ApplyProps>();
      props.message.author.tag = tag;

      props.app.db.checkUser
        .calledWith(tagBase64)
        .mockReturnValue(Promise.resolve(UserStatus.APPLIED));

      await apply(props);

      expect(props.app.db.checkUser).toBeCalledWith(tagBase64);
      expect(props.message.reply).toBeCalledWith(anyDmMessages.applied);
    });
    it('should give error message on wrong address', async () => {
      const props = mockDeep<ApplyProps>();
      props.message.author.tag = tag;
      props.address = wrongAddress;

      props.app.db.checkUser
        .calledWith(tagBase64)
        .mockReturnValue(Promise.resolve(UserStatus.IN_SNAPSHOT));

      await apply(props);

      expect(props.app.db.checkUser).toBeCalledWith(tagBase64);
      expect(props.message.reply).toBeCalledWith(messages.wrongAddress);
    });
    it('should work if everything ok', async () => {
      const props = mockDeep<ApplyProps>();
      props.message.author.tag = tag;
      props.address = address;

      props.app.db.checkUser
        .calledWith(tagBase64)
        .mockReturnValue(Promise.resolve(UserStatus.IN_SNAPSHOT));

      props.app.db.addUser
        .calledWith(tagBase64, address)
        .mockReturnValue(Promise.resolve(addUserResponse));

      await apply(props);

      expect(props.app.db.checkUser).toBeCalledWith(tagBase64);
      expect(props.app.db.addUser).toBeCalledWith(tagBase64, address);
      expect(props.message.reply).toBeCalledWith(messages.success(addUserResponse.tokens));
    });
  });
});
