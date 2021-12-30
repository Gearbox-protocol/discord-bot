enum Tables {
  USERS = 'users',
  USERS_APPLIED = 'users_applied',
}

enum UserTable {
  ID = 'discordId',
  ORIGINAL_ID = 'originalDiscordId',
  LIST_NUMBER = 'numberInList',
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
        ${UserTable.ORIGINAL_ID} TEXT NOT NULL,
        ${UserTable.LIST_NUMBER} INTEGER NOT NULL,
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

  insertToUsers: `INSERT INTO ${Tables.USERS} 
      (${UserTable.ID}, ${UserTable.ORIGINAL_ID}, ${UserTable.LIST_NUMBER}, ${UserTable.TOKENS}) 
      VALUES($1, $2, $3, $4)`,
  insertToAppliedUsers: `INSERT INTO ${Tables.USERS_APPLIED} 
      (${AppliedUserTable.ID}, ${AppliedUserTable.ADDRESS}) 
      VALUES($1, $2)`,

  getUser: `SELECT ${UserTable.ID}, ${UserTable.TOKENS}::numeric::int FROM ${Tables.USERS} WHERE ${UserTable.ID}=$1`,

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
