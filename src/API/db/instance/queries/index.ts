enum Tables {
  USERS = 'users',
  USERS_APPLIED = 'users_applied',
}

enum UserTable {
  ID = 'discordId',
  TOKENS = 'tokens',
}

enum AppliedUserTable {
  ID = 'discordId',
  ADDRESS = 'address',
  CREATED_AT = 'created_at',
}

const queries = {
  usersTable: `
    CREATE TABLE IF NOT EXISTS ${Tables.USERS} (
        ${UserTable.ID} TEXT NOT NULL PRIMARY KEY,
        ${UserTable.TOKENS} INTEGER NOT NULL
    );`,
  appliedUsersTable: `
    CREATE TABLE IF NOT EXISTS ${Tables.USERS_APPLIED} (
        ${AppliedUserTable.ID} TEXT NOT NULL PRIMARY KEY REFERENCES ${Tables.USERS} (${UserTable.ID}),
        ${AppliedUserTable.ADDRESS} TEXT NOT NULL,
        ${AppliedUserTable.CREATED_AT} TIMESTAMP DEFAULT NOW()
    );`,
  countUsers: `SELECT usersCount(*) FROM ${Tables.USERS};`,
  countAppliedUsers: `SELECT appliedUsersCount(*) FROM ${Tables.USERS_APPLIED};`,
} as const;

export { queries, Tables, UserTable, AppliedUserTable };
