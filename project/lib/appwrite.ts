import { Account, Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject('6a3ee0ed00135bf6b5eb');

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
