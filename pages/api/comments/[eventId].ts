import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase, insertDocument, getDocuments } from "utils/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { eventId } = req.query;
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

  if (req.method === "POST") {
    const { name, email, comment } = req.body;

    if (
      !email.includes("@") ||
      !email.includes(".") ||
      !name ||
      name.trim() === "" ||
      !comment ||
      comment.trim() === ""
    ) {
      res.status(422).json({ error: "Please provide a valid input." });
      client.close();
      return;
    }

    const newComment = {
      name,
      email,
      comment,
      eventId,
    };

    try {
      // Insert new comment into the database
      await insertDocument({
        client,
        collection: "comments",
        document: { comment: newComment },
      });

      res.status(201).json({
        message: "Comment created.",
        comment: newComment,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error inserting new comment!",
      });
    }
  }

  if (req.method === "GET") {
    try {
      // Get all comments for a specific event sorted in DESC order (newest first)
      const comments = await getDocuments({
        client,
        collection: "comments",
        find: { "comment.eventId": eventId },
        sort: { _id: -1 },
      });
      res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json({
        message: "Error getting comments!",
      });
    }
  }

  client.close();
};

export default handler;
