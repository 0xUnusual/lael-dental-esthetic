
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import winston from 'winston';

// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'server-error.log', level: 'error' }),
        new winston.transports.File({ filename: 'server.log' }),
        new winston.transports.Console()
    ]
});

// Configure dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const app = express();
const port = process.env.VITE_PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Logging middleware
app.use((req, res, next) => {
    logger.info({ method: req.method, url: req.url, timestamp: new Date().toISOString() });
    next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.API_KEY || "AIzaSyDTbSVuJlpeysVKo4GLrtCemumg4Gn9XMg";

if (!apiKey) {
    logger.error("CRITICAL ERROR: No API Key found in environment variables.");
    logger.info(`API Key loaded (first 5 chars): ${apiKey.substring(0, 5)}...`);
}

const genAI = new GoogleGenerativeAI(apiKey);
let WORKABLE_MODEL = "gemini-1.5-flash"; // Default
let SIMULATOR_MODEL = "gemini-1.5-flash"; // Default for simulator capability

// Serve static files from the React app build directory
app.use(express.static(join(__dirname, '../dist')));

// Check available models on startup
async function findWorkingModel() {
    const staticCandidateModels = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-pro",
        "gemini-1.5-pro-latest",
        "gemini-1.0-pro",
        "gemini-pro",
        "gemini-pro-vision"
    ];

    logger.info("Starting model connectivity check...");

    let availableModels = [];
    try {
        // Fetch available models dynamically using the API key
        const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(listUrl);
        const data = await response.json();

        if (data.models) {
            // Filter for gemini models that support generateContent
            availableModels = data.models
                .filter(m => m.name.includes('gemini') && m.supportedGenerationMethods.includes('generateContent'))
                .map(m => m.name.replace('models/', ''));

            logger.info(`Discovered ${availableModels.length} available Gemini models: ${availableModels.join(', ')}`);
        }
    } catch (e) {
        logger.warn("Failed to list models dynamically, falling back to static list.", e);
    }

    // Combine discovered models with static fallbacks, prioritizing flash > pro > others
    const combinedModels = [
        ...availableModels.filter(m => m.includes('flash')), // Prefer flash first
        ...availableModels.filter(m => !m.includes('flash')), // Then other discovered models
        ...staticCandidateModels // Then static fallbacks
    ]; // Remove duplicates
    const uniqueCandidates = [...new Set(combinedModels)];

    for (const modelName of uniqueCandidates) {
        try {
            logger.info(`Testing model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            const response = await result.response;
            logger.info(`SUCCESS: Model ${modelName} is working.`);
            WORKABLE_MODEL = modelName;

            // For Simulator, we are now EXCLUSIVELY using OpenAI, so this variable is less relevant 
            // but we keep it for reference or potential future use.
            SIMULATOR_MODEL = "openai-dall-e-3";

            logger.info(`Initializing 'Nano Banana Pro' (Powered by OpenAI DALL-E 3)`);
            return;
        } catch (error) {
            logger.warn(`Failed model ${modelName}: ${error.message.split('\n')[0]}`);
        }
    }
    logger.error("CRITICAL: No working Gemini model found!");
}
findWorkingModel();

// Chat Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { history, message } = req.body;
        logger.info('Chat request received', { message });

        // System Instruction
        const systemInstruction = `You are a helpful, professional, and friendly dental assistant for 'Lael Dental Esthetic'. 
    Your goal is to help potential patients with questions about dental procedures, smile design, financing, and booking.
    
    Key Information:
    - We specialize in painless smile design, veneers, and natural results.
    - We offer conscious sedation.
    - Location: Santo Domingo, Dominican Republic.
    - Services: VIP attention, 3D scanning, mockups.
    - Financing: 6, 12, 24 months, international insurance accepted.
    - Tone: Elegant, reassuring, high-end.
    
    Keep responses concise (under 100 words unless detailed info is requested).`;

        // Fix: The SDK requires the first message in history to be from 'user'.
        // If the first message is from 'model' (e.g. welcome message), we must remove it from the history sent to the API.
        let validHistory = (history || []).map(h => ({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
        }));

        if (validHistory.length > 0 && validHistory[0].role === 'model') {
            validHistory.shift();
        }

        // Use the model found to be working
        logger.info(`Using active model for chat: ${WORKABLE_MODEL}`);
        const chatModel = genAI.getGenerativeModel({ model: WORKABLE_MODEL, systemInstruction });

        const chat = chatModel.startChat({
            history: validHistory,
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        logger.info('Chat response generated successfully');
        res.json({ text });

    } catch (error) {
        logger.error('Chat error:', error);
        res.status(500).json({ error: "Failed to process chat message", details: error.message });
    }
});

// Smile Simulator Endpoint
// OpenAI Configuration
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Smile Simulator Endpoint - EXCLUSIVELY OpenAI (GPT-4o + DALL-E 3)
app.post('/api/simulate-smile', async (req, res) => {
    const { image, prompt } = req.body;
    logger.info('Simulation request received (OpenAI Exclusive)');

    if (!image) {
        return res.status(400).json({ error: "Image data is required" });
    }

    if (!process.env.OPENAI_API_KEY) {
        logger.error("OpenAI API Key is missing.");
        return res.status(500).json({ error: "Server misconfiguration: Missing OpenAI API Key." });
    }

    try {
        // STAGE 1: Analysis with GPT-4o
        logger.info('Analyzing image with GPT-4o Vision...');
        const analysisResponse = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Analyze this selfie. Describe the person's face, smile, and context in detail. Focus on teeth and smile features." },
                        { type: "image_url", image_url: { "url": image } },
                    ],
                },
            ],
            max_tokens: 300,
        });

        const description = analysisResponse.choices[0].message.content;
        logger.info('Image Analysis complete.');

        // STAGE 2: Generation with DALL-E 3
        const fullPrompt = `Create a realistic photo based on this description: ${description}. 
        CRITICAL MODIFICATION: ${prompt || "Apply a perfect Hollywood smile design, white teeth, straight, natural look."}. 
        Keep the person's identity and features as close as possible.`;

        logger.info('Generating image with DALL-E 3...');
        const imageResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: fullPrompt.substring(0, 3900), // Max chars safe limit
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
            quality: "hd",
            style: "natural"
        });

        const generatedImage = `data:image/png;base64,${imageResponse.data[0].b64_json}`;
        logger.info('Simulation response generated successfully (OpenAI)');

        res.json({
            image: generatedImage,
            description: `**Análisis de Sonrisa (GPT-4o):**\n${description}\n\n**Resultado:** Diseño generado exclusivamente con DALL·E 3.`
        });

    } catch (error) {
        logger.error('OpenAI Simulation Failed:', error);

        let userMessage = "Error generanda la simulación (OpenAI).";
        if (error.status === 401) userMessage = "Error de Autenticación: API Key de OpenAI inválida.";
        if (error.code === 'content_policy_violation') userMessage = "Política de Seguridad: La imagen fue marcada por los filtros de OpenAI. Intenta con otra foto.";
        if (error.code === 'insufficient_quota' || (error.status === 429 && error.type === 'insufficient_quota')) {
            userMessage = "CRÉDITOS INSUFICIENTES: Tu cuenta de OpenAI no tiene saldo disponible (Quota Exceeded). Por favor recarga en platform.openai.com.";
        } else if (error.status === 429) {
            userMessage = "Límite de Consultas: Demasiadas peticiones. Intenta más tarde.";
        }

        res.status(500).json({
            error: userMessage,
            details: error.message
        });
    }
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.use((req, res, next) => {
    // If it's an API request that failed, don't return HTML
    if (req.path.startsWith('/api')) {
        return next();
    }
    res.sendFile(join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    logger.info(`Server running on port ${port}`);
});
