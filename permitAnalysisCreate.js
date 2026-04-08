import 'dotenv/config';
import Anthropic from "@anthropic-ai/sdk";
// Initialize client — reads ANTHROPIC_API_KEY from .env automatically
const anthropic = new Anthropic();
async function getPermits(latitude, longitude) {
    if (latitude === null || longitude === null) {
        console.log("Latitude or longitude is null.");
        return;
    }
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    const response = await anthropic.messages.create({
        model: "claude-opus-4-6",
        max_tokens: 100,
        messages: [
            {
                role: "user",
                content: `Given the following lat long, find all potential permits that may be applicable for a utility scale solar project. ${latitude}, ${longitude}`,
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
getPermits(39.54251986272744, -103.36220591271385).catch(console.error);
