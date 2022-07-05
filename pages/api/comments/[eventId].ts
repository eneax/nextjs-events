import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { eventId } = req.query;
  const client = await MongoClient.connect(`${process.env.DB_URL}`);

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
      return;
    }

    const newComment = {
      name,
      email,
      comment,
      eventId,
    };

    const db = client.db("events");
    await db.collection("comments").insertOne({ comment: newComment });

    res.status(201).json({
      message: "Comment created.",
      comment: newComment,
    });
  }

  if (req.method === "GET") {
    const db = client.db("events");
    const comments = await db
      .collection("comments")
      .find({ "comment.eventId": eventId }) // find all comments for this event
      .sort({ _id: -1 }) // sort by newest comment first
      .toArray();

    res.status(200).json({ comments });
  }

  client.close();
};

export default handler;
