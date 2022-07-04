import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
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

    const commentData = {
      id: new Date().toISOString(),
      name,
      email,
      comment,
    };
    console.log(commentData);

    res.status(201).json({
      message: "Comment created.",
      comment: commentData,
    });
  }

  if (req.method === "GET") {
    const dummyComments = [
      {
        id: "c1",
        name: "John",
        comment: "This is my comment!",
      },
      {
        id: "c2",
        name: "Jane",
        comment: "Another comment!",
      },
    ];

    res.status(200).json({
      comments: dummyComments,
    });
  }
};

export default handler;
