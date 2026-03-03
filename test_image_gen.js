
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env.local') });

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function testImageGen() {
    const modelName = "gemini-2.0-flash-exp"; // Trying a newer flash model, or specific image one if needed
    // candidates: gemini-2.0-flash-exp-image-generation ??
    // Let's try the one explicitly named for image generation if possible, or the main experiment.

    // From log: gemini-2.0-flash-exp-image-generation
    const targetModel = "gemini-2.0-flash-exp";

    console.log(`Testing image generation with ${targetModel}...`);

    try {
        const model = genAI.getGenerativeModel({ model: targetModel });

        // Simple text to image prompt first? 
        // Or Gemini 2.0 Flash Exp might support "generate images" via tool use or native output?
        // Google GenAI Node SDK usually just returns text parts unless configured.
        // Let's try a prompt that asks for an image.

        const result = await model.generateContent("Create an image of a happy dentist.");
        const response = result.response;

        console.log("Response parts:", JSON.stringify(response.candidates[0].content.parts.length));

        // Check if any part has inlineData (image)
        const parts = response.candidates[0].content.parts;
        const imagePart = parts.find(p => p.inlineData || p.executableCode); // Sometimes it's code to generate image?

        if (imagePart) {
            console.log("Image/Data part found!", Object.keys(imagePart));
        } else {
            console.log("No image part found. Text:", response.text());
        }

    } catch (error) {
        console.error("Error:", error.message);
    }
}

testImageGen();
