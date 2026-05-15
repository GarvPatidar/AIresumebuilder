import "dotenv/config";
import OpenAI from "openai";

const ai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPEN_AI_BASEURL,
});

async function test() {
    try {
        console.log("Testing AI connection...");
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gemini-1.5-flash",
            messages: [{ role: "user", content: "Say hello!" }],
        });
        console.log("Response:", response.choices[0].message.content);
    } catch (e) {
        console.error("AI Error:", e);
    }
}

test();
