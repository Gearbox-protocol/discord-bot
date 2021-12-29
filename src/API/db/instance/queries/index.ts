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
        ${UserTable.TOKENS} MONEY NOT NULL
    )`,
  appliedUsersTable: `
    CREATE TABLE IF NOT EXISTS ${Tables.USERS_APPLIED} (
        ${AppliedUserTable.ID} TEXT NOT NULL PRIMARY KEY REFERENCES ${Tables.USERS} (${UserTable.ID}),
        ${AppliedUserTable.ADDRESS} TEXT NOT NULL,
        ${AppliedUserTable.CREATED_AT} TIMESTAMP DEFAULT NOW()
    )`,

  userTableExists: `SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_name = '${Tables.USERS}'
  )`,

  countUsers: `SELECT count(*) FROM ${Tables.USERS}`,
  countAppliedUsers: `SELECT count(*) FROM ${Tables.USERS_APPLIED}`,

  insertToUsers: `INSERT INTO ${Tables.USERS} (${UserTable.ID}, ${UserTable.TOKENS}) VALUES($1, $2)`,
  insertToAppliedUsers: `INSERT INTO ${Tables.USERS_APPLIED} (${AppliedUserTable.ID}, ${AppliedUserTable.ADDRESS}) VALUES($1, $2)`,

  checkExistenceInUsers: `
    SELECT EXISTS (
        SELECT 1 FROM ${Tables.USERS} WHERE ${UserTable.ID}=$1
    )`,
  checkExistenceInAppliedUsers: `
    SELECT EXISTS (
        SELECT 1 FROM ${Tables.USERS_APPLIED} WHERE ${AppliedUserTable.ID}=$1
    )`,
} as const;

export { queries, Tables, UserTable, AppliedUserTable };
