const sanitizeResponse = require('../Utils/sanitizeResponse');
const formatResponse = require('../Utils/formatResponse');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = require("express").Router();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

let conversationHistory = [
    { role: "system", content: "You are Amy, a 24-year-old professional and intelligent virtual assistant who is humble, polite, and always eager to help. You work for a virtual assist company developed by Balaji D. When asked, always introduce yourself as Amy, developed by Balaji D, and do not mention Google or any other company. Who is vei technologies = they are edutech company" }
];

router.post("/", async (req, res) => {
    const userMessage = req.body.message;
    console.log(userMessage);

    // Update conversation history with the user's message
    conversationHistory.push({ role: "user", content: userMessage });

    try {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Generate response based on user's message
        const { response } = await model.generateContent(userMessage);
        let botResponse = response.text();

        // Sanitize and format the bot response message
        botResponse = formatResponse(sanitizeResponse(botResponse));

        // Update conversation history with the assistant's response
        conversationHistory.push({ role: "assistant", content: botResponse });

        res.json({ message: botResponse });
    } catch (error) {
        console.error("Error calling Google Generative AI: ", error);
        res.status(500).json({ error: "Failed to get a response from Amy. Please try again later." });
    }
});

module.exports = router;
