import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY); // Initialize Google Generative AI

export async function handler(event) {
  try {
    // Parse incoming POST request data
    const body = JSON.parse(event.body);
    const { username, logician, feeler, creative, texts, indonesian, english } =
      body;

    // Determine the prompt based on language
    let prompt = "";
    if (indonesian) {
      prompt = `Describe and deduct ${username} personality traits of someone in a full detail based on this following text using bahasa gaul jaksel, harus pakai bahasa gaul jaksel. ${texts} and also consider this score ${logician}, ${feeler}, ${creative}, just consider the score for description or personality trait, don't write the score to the text. Minimum 180 words. Don't use word anjir or buset. Don't assume gender. Don't say based on the text or berdasarkan teks`;
    } else if (english) {
      prompt = `Describe and deduct ${username} personality traits of someone in a full detail based on this following text. ${texts} and also consider this score ${logician}, ${feeler}, ${creative}, just consider the score for description or personality trait, dont write the score to the text, don't say based on the provided text. Minimum 180 words. Don't assume gender`;
    }

    // Call Google Generative AI
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);

    // Respond with generated content
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Handle CORS
      },
      body: JSON.stringify({ generatedText: result.response.text() }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Handle CORS
      },
      body: JSON.stringify({
        error: "An error occurred while processing your request",
      }),
    };
  }
}
