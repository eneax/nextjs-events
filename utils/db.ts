import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(`${process.env.DB_URL}`);
  return client;
};

export const insertDocument = async ({
  client,
  dbName = "events",
  collection,
  document,
}: {
  client: MongoClient;
  dbName?: string;
  collection: string;
  document: any;
}) => {
  const db = client.db(dbName);
  const result = await db.collection(collection).insertOne(document);
  return result;
};

export const getDocuments = async ({
  client,
  dbName = "events",
  collection,
  find = {},
  sort,
}: {
  client: MongoClient;
  dbName?: string;
  collection: string;
  find?: any;
  sort?: any;
}) => {
  const db = client.db(dbName);
  const documents = await db
    .collection(collection)
    .find(find)
    .sort(sort)
    .toArray();
  return documents;
};
