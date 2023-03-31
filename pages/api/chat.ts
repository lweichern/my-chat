import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req:", req.body);
  console.log("Api key: ", process.env.OPENAI_API_KEY);
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method should be POST" });
  } else {
    try {
      const prompt = req.body.prompt;

      const config = new Configuration({
        organization: "org-3KLjoxokzNSHFnQxAKExZ2AA",
        apiKey: process.env.OPENAI_API_KEY,
      });

      const openai = new OpenAIApi(config);
      const aiResults = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 2048,
      });

      //   const imageResult = await openai.createImage

      const response = aiResults.data.choices[0].text;

      res.status(200).json({ text: response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
