import { GoogleGenerativeAI } from "@google/genai"; // Use the correct package: @google/genai
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Use the new SDK initialization based on best practice
const genAI = new GoogleGenerativeAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });

// Import Node.js filesystem module to handle image saving (optional)
import * as fs from "fs";

export async function handler(event) {
  try {
    // Parse incoming POST request data
    const body = JSON.parse(event.body);
    const { username, logician, feeler, creative, texts, indonesian, english } =
      body;

    // --- 1. Text Generation Logic (as you had it) ---
    let textPrompt = "";
    if (indonesian) {
      textPrompt = `Describe and deduct ${username} personality traits of someone in a full detail based on this following text using bahasa gaul jaksel, harus pakai bahasa gaul jaksel. ${texts} and also consider this score ${logician}, ${feeler}, ${creative}, just consider the score for description or personality trait, don't write the score to the text. Minimum 180 words. Don't use word anjir or buset. Don't assume gender. Don't say based on the text or berdasarkan teks`;
    } else if (english) {
      textPrompt = `Describe and deduct ${username} personality traits of someone in a full detail based on this following text. ${texts} and also consider this score ${logician}, ${feeler}, ${creative}, just consider the score for description or personality trait, dont write the score to the text, don't say based on the provided text. Minimum 180 words. Don't assume gender`;
    } else {
      // Handle case where neither language is specified
      textPrompt = `Describe ${username}'s personality traits based on this text: ${texts} and the archetype scores: Logician ${logician}, Feeler ${feeler}, Creative ${creative}. Generate a minimum of 180 words.`;
    }

    const textModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const textResult = await textModel.generateContent(textPrompt);
    const generatedText = textResult.response.text();

    // ------------------------------------------------

    // --- 2. Image Generation Logic ---

    // Create a concise prompt for the image, instructing the model on style and content.
    const imagePrompt = `A high-quality, professional, single-character cartoon/anime style portrait of a person who is primarily a ${
      logician > feeler && logician > creative
        ? "Logical Thinker"
        : feeler > logician && feeler > creative
        ? "Deep Feeler"
        : "Creative Innovator"
    } with a mix of the other traits. The character's pose, clothes, and setting should subtly represent the following personality description: ${generatedText}. Use a vibrant color palette, vector art style, and a clean, solid background.`;

    const imageModelName = "gemini-2.5-flash-image"; // Model for image generation

    // Call the image generation model
    const imageResult = await genAI.models.generateContent({
      model: imageModelName,
      contents: [{ role: "user", parts: [{ text: imagePrompt }] }],
    });

    // Extract the image data from the response.
    // The image data is typically in the 'inlineData' part of the response candidate.
    let generatedImageBase64 = null;

    // Find the image part in the response
    const imagePart = imageResult.candidates?.[0]?.content?.parts.find(
      (part) => part.inlineData && part.inlineData.mimeType.startsWith("image/")
    );

    if (imagePart) {
      generatedImageBase64 = imagePart.inlineData.data;
      // Optional: Save the image to a file (useful for debugging in Node.js)
      // fs.writeFileSync('character_cartoon.png', Buffer.from(generatedImageBase64, 'base64'));
    }
    // ------------------------------------------------

    // --- 3. Respond with both text and image ---
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Handle CORS
      },
      body: JSON.stringify({
        generatedText: generatedText,
        generatedImage: generatedImageBase64
          ? `data:${imagePart.inlineData.mimeType};base64,${generatedImageBase64}`
          : null,
      }),
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
        details: error.message, // Include error message for better debugging
      }),
    };
  }
}
