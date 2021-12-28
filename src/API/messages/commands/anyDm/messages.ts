import { TASKS_LINK, CONTRIBUTION_LINK, DETAILS_LINK } from 'src/config';

const messages = {
  alreadyApplied: `
You have already given me your wallet address. There is nothing else for you to do here! Make sure to contribute to Gearbox DAO, see some of the tasks ${TASKS_LINK}.
  `,
  notInList: `
Hey, it seems like your nickname is not on the list. All the info and details can be found ${DETAILS_LINK}. Do not ask in Discord “why” you are not on it, because the link above mentions all the criteria.

There are no new drop stages, as Gearbox is now in control of the community DAO! If you would like to become a contributor and help grow the protocol, check ${CONTRIBUTION_LINK}.
  `,
  canApply: `
Hey, seems like you are eligible for the early Discord drop, congrats! Send me your Ethereum wallet. Some rules for you to know:

- Do not send your exchange wallet address, because then you GEARs will be lost
- Once submitted, you can’t change the address. Please be careful with what you paste below
  `,
} as const;

export { messages };
