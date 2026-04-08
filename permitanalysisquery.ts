import 'dotenv/config';
import { query } from "@anthropic-ai/claude-agent-sdk";

async function getPermits(latitude: number | null, longitude: number | null) {
  if (latitude === null || longitude === null) {
    console.log("Latitude or longitude is null.");
    return;
  }

  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

  for await (const message of query({
    prompt: `Find all permits required for a utility-scale solar project at coordinates ${latitude}, ${longitude}.
First, determine the county, state, and any relevant jurisdictions for these coordinates.
Then research and list every permit likely required, organized by category (federal, state, county, local).
For each permit include: permit name, issuing agency, why it applies to this location, and any known thresholds or triggers.`,
    options: {
      model: "claude-opus-4-6",
      thinking: { type: "adaptive" },
      allowedTools: ["WebSearch", "WebFetch"],
      systemPrompt: `You are an expert permitting consultant specializing in utility-scale solar energy projects in the United States.
You have deep knowledge of federal, state, and local permitting requirements including NEPA, FERC, wetlands/404 permits, endangered species, FAA obstruction, interconnection, and land use entitlements.
When given coordinates, use web search to identify the jurisdiction and look up current permitting requirements specific to that location.
Always cite your sources and note if requirements may have changed recently.`,
    },
  })) {
    if ("result" in message) {
      console.log("Claude response:");
      console.log(message.result);
    }
  }
}

// Run the script
const latArg = process.argv[2] ? parseFloat(process.argv[2]) : null;
const lonArg = process.argv[3] ? parseFloat(process.argv[3]) : null;

const latitude = latArg !== null && !isNaN(latArg) ? latArg : null;
const longitude = lonArg !== null && !isNaN(lonArg) ? lonArg : null;

getPermits(latitude, longitude).catch(console.error);