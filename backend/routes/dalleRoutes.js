import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").get((req, res) => {
  res.send("Hello from DALL-E");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1792x1024",
      response_format: 'b64_json',
      quality: 'hd'
    });
    const image = response.data[0].b64_json

    res.status(200).json({ photo: image })
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(err?.response?.data?.error?.message || "Internal Server Error");
  }
});

export default router;
