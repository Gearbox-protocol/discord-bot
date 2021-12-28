interface Database {
  checkUser: (userTag: string) => UserStatus;
  addUser: (userTag: string, userAddress: string) => void;
}

interface DbInstance {
  table1: {};
  table2: {};
}

enum UserStatus {
  IN_SNAPSHOT = 'IN_SNAPSHOT',
  NOT_IN_SNAPSHOT = 'NOT_IN_SNAPSHOT',
  APPLIED = 'APPLIED',
}

const checkUser =
  (db: DbInstance): Database['checkUser'] =>
  (userTag: string): UserStatus => {
    const userCanApply = userTag in db.table1;

    if (!userCanApply) return UserStatus.NOT_IN_SNAPSHOT;

    const applied = userTag in db.table2;

    if (applied) return UserStatus.APPLIED;

    return UserStatus.IN_SNAPSHOT;
  };

const addUser =
  (db: DbInstance): Database['addUser'] =>
  (userTag, userAddress) => {
    const applied = userTag in db.table2;
    if (applied) return;

    db.table2[userTag] = userAddress;
  };

const initDb = (): Database => {
  const db = {
    table1: {
      'blizzz93#1279': true,
    },
    table2: {},
  };
  return {
    checkUser: checkUser(db),
    addUser: addUser(db),
  };
};

export type { Database };
export { initDb, UserStatus };
