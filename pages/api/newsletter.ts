import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
  error?: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
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

    res.status(201).json({
      message: "Successfully subscribed!",
    });
  }
};

export default handler;
