import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method should be POST" });
  } else {
    try {
      const prompt = req.body.prompt;

      const config = new Configuration({
        organization: process.env.OPENAI_ORGANIZATION_ID,
        apiKey: process.env.OPENAI_API_KEY,
      });

      const openai = new OpenAIApi(config);
      const textResults = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
        max_tokens: 2048,
      });

      const response = textResults.data.choices[0].message;

      res.status(200).json({ text: response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
