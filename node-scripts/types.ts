export interface UserCsvRow {
  Id: number;
  Author: string;
  Tokens: string;
}

export interface UserTransformedCsvRow {
  discord_id: string;
  number_in_list: number;
  tokens: string;
}
