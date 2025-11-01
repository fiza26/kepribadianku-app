const PORT = 8000;
import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

app.post("/gemini", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const { username, logician, feeler, creative, texts, indonesian, english } =
      req.body;

    // Determine the language and create the prompt accordingly
    let prompt = "";
    if (indonesian) {
      prompt = `Describe and deduct ${username} personality traits of someone in a full detail based on this following text using bahasa gaul jaksel, harus pakai bahasa gaul jaksel. ${texts} and also consider this score ${logician}, ${feeler}, ${creative}, just consider the score for description or personality trait, don't write the score to the text. Minimum 180 words. Don't use word anjir or buset. Don't assume gender. Don't say based on the text or berdasarkan teks`;
    } else if (english) {
      prompt = `Describe and deduct ${username} personality traits of someone in a full detail based on this following text. ${texts} and also consider this score ${logician}, ${feeler}, ${creative}, just consider the score for description or personality trait, dont write the score to the text, don't say based on the provided text. Minimum 180 words. Don't assume gender`;
    }

    const result = await model.generateContent(prompt);
    const resultText = result.response.text();
    res.json({ generatedText: resultText });
    console.log("Result:", result.response.text());
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
