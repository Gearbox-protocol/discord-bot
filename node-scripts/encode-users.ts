import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

interface UserCsvRow {
  Id: number;
  Author: string;
  Tokens: string;
}

interface UserDetailsRow {
  discordId: string;
  originalDiscordId: string;
  numberInList: number;
  tokens: string;
}

const writeStream = fs.createWriteStream('users-transformed.csv');

fs.createReadStream(path.resolve(__dirname, '../', 'users.csv'))
  .pipe(csv.parse({ headers: true }))
  // pipe the parsed input into a csv formatter
  .pipe(csv.format<UserCsvRow, UserDetailsRow>({ headers: true }))
  // Using the transform function from the formatting stream
  .transform((row, next): void => {
    const { Id, Author, Tokens } = row;
    return next(null, {
      discordId: Buffer.from(Author).toString('base64'),
      originalDiscordId: Author,
      numberInList: Id,
      tokens: Tokens,
    });
  })
  .pipe(writeStream)
  .on('end', () => process.exit());
