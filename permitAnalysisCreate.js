import 'dotenv/config';
import Anthropic from "@anthropic-ai/sdk";
// Initialize client — reads ANTHROPIC_API_KEY from .env automatically
const anthropic = new Anthropic();
// Simple function to ask for weather
async function getPermits() {
    const response = await anthropic.messages.create({
        model: "claude-opus-4-6",
        max_tokens: 100,
        messages: [
            {
                role: "user",
                content: "Given the following lat long, find all potential permits that may be applicable for a utility scale solar project. 39.54251986272744, -103.36220591271385",
            },
        ],
    });
    // Extract and print response text
    //const text = response.content
    //  .map((block) => (block.type === "text" ? block.text : ""))
    //  .join("");
    console.log("Claude response:");
    console.log(response.content);
}
// Run the script
getPermits().catch(console.error);
