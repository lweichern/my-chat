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

      const imageResult = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
      });

      const imageResponse = imageResult.data.data[0].url;

      console.log("Image response: ", imageResponse);

      //   const response = textResults.data.choices[0].message;

      //   res.status(200).json({ text: response });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
