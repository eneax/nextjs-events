import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase, insertDocument } from "utils/db";

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

    let client;
    try {
      // Connect to the database
      client = await connectToDatabase();
    } catch (error) {
      res.status(500).json({
        message: "Error connecting to database!",
      });
      return;
    }

    try {
      // Insert email into the database
      await insertDocument({
        client,
        collection: "newsletter",
        document: { email },
      });
      // Close the database connection
      client.close();
    } catch (error) {
      res.status(500).json({
        message: "Error inserting data!",
      });
      return;
    }

    res.status(201).json({
      message: "Successfully subscribed!",
    });
  }
};

export default handler;
