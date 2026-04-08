import 'dotenv/config';
import Anthropic from "@anthropic-ai/sdk";

// Initialize client — reads ANTHROPIC_API_KEY from .env automatically
const anthropic = new Anthropic();

async function getPermits(latitude: number | null, longitude: number | null) {
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

  console.log("Claude response:");
  console.log(response.content);
}

// Run the script
const latArg = process.argv[2] ? parseFloat(process.argv[2]) : null;
const lonArg = process.argv[3] ? parseFloat(process.argv[3]) : null;

const latitude = latArg !== null && !isNaN(latArg) ? latArg : null;
const longitude = lonArg !== null && !isNaN(lonArg) ? lonArg : null;

getPermits(latitude, longitude).catch(console.error);