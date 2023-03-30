// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("req:", req.body);
  console.log("Api key: ", process.env.OPENAI_API_KEY);
  res.status(200).json(req.body);
}
