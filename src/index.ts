import * as dotenv from 'dotenv';
import { BOT_SECRET_TOKEN } from 'src/config';

dotenv.config();

function main() {
  console.log(BOT_SECRET_TOKEN);
}

main();
