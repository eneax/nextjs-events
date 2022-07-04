import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

type Data = {
  message?: string;
  error?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "POST") {
    const { email } = req.body;

    if (
      !email ||
      !email.trim() ||
      !email.includes("@") ||
      !email.includes(".")
    ) {
      res.status(422).json({
        error: "Invalid email address!",
      });
      return;
    }

    // Connect to the database
    const client = await MongoClient.connect(`${process.env.DB_URL}`);
    const db = client.db("newsletter");
    await db.collection("emails").insertOne({ email });
    client.close();

    res.status(201).json({
      message: "Successfully subscribed!",
    });
  }
};

export default handler;
