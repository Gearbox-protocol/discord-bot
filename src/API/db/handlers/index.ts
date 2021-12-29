import type { DbInterface, Database } from '../';

enum UserStatus {
  IN_SNAPSHOT = 'IN_SNAPSHOT',
  NOT_IN_SNAPSHOT = 'NOT_IN_SNAPSHOT',
  APPLIED = 'APPLIED',
}

const checkUser =
  (db: DbInterface): Database['checkUser'] =>
  async (tag: string): Promise<UserStatus> => {
    const userCanApply = await db.actions.checkUserInSnapshot(tag);

    if (!userCanApply) return UserStatus.NOT_IN_SNAPSHOT;

    const applied = await db.actions.checkUserInApplied(tag);

    if (applied) return UserStatus.APPLIED;

    return UserStatus.IN_SNAPSHOT;
  };

const addUser =
  (db: DbInterface): Database['addUser'] =>
  async (tag, address) => {
    await db.actions.insertAppliedUser(tag, address);
  };

export { checkUser, addUser, UserStatus };
