import type { HealthSource } from "./types";

/**
 * Curated catalogue of trusted sources.
 * Gemini can only pick IDs from this list. The server turns the IDs into real
 * links, so the model can never invent a title or URL.
 * Verify each link yourself, and add more pages as your library grows.
 */
export const SOURCES: Record<string, HealthSource> = {
  "nhs-999": {
    title: "When to call 999 or go to A&E",
    publisher: "NHS",
    url: "https://www.nhs.uk/nhs-services/urgent-and-emergency-care-services/when-to-call-999/",
  },
  "who-hepatitis-b": {
    title: "Hepatitis B fact sheet",
    publisher: "WHO",
    url: "https://www.who.int/news-room/fact-sheets/detail/hepatitis-b",
  },
  "who-hepatitis-c": {
    title: "Hepatitis C fact sheet",
    publisher: "WHO",
    url: "https://www.who.int/news-room/fact-sheets/detail/hepatitis-c",
  },
  "nhs-hepatitis-b": {
    title: "Hepatitis B",
    publisher: "NHS",
    url: "https://www.nhs.uk/conditions/hepatitis-b/",
  },
  "nhs-hepatitis-c": {
    title: "Hepatitis C",
    publisher: "NHS",
    url: "https://www.nhs.uk/conditions/hepatitis-c/",
  },
  "who-hiv": {
    title: "HIV and AIDS fact sheet",
    publisher: "WHO",
    url: "https://www.who.int/news-room/fact-sheets/detail/hiv-aids",
  },
  "nhs-hiv": {
    title: "HIV and AIDS",
    publisher: "NHS",
    url: "https://www.nhs.uk/conditions/hiv-and-aids/",
  },
  "who-diabetes": {
    title: "Diabetes fact sheet",
    publisher: "WHO",
    url: "https://www.who.int/news-room/fact-sheets/detail/diabetes",
  },
  "nhs-diabetes": {
    title: "Diabetes",
    publisher: "NHS",
    url: "https://www.nhs.uk/conditions/diabetes/",
  },
  "who-hypertension": {
    title: "Hypertension fact sheet",
    publisher: "WHO",
    url: "https://www.who.int/news-room/fact-sheets/detail/hypertension",
  },
  "nhs-high-blood-pressure": {
    title: "High blood pressure (hypertension)",
    publisher: "NHS",
    url: "https://www.nhs.uk/conditions/high-blood-pressure-hypertension/",
  },
  "nhs-headaches": {
    title: "Headaches",
    publisher: "NHS",
    url: "https://www.nhs.uk/conditions/headaches/",
  },
  "who-malaria": {
    title: "Malaria fact sheet",
    publisher: "WHO",
    url: "https://www.who.int/news-room/fact-sheets/detail/malaria",
  },
  "nhs-malaria": {
    title: "Malaria",
    publisher: "NHS",
    url: "https://www.nhs.uk/conditions/malaria/",
  },
  "who-healthy-diet": {
    title: "Healthy diet fact sheet",
    publisher: "WHO",
    url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet",
  },
  "nhs-eat-well": {
    title: "Eat well",
    publisher: "NHS",
    url: "https://www.nhs.uk/live-well/eat-well/",
  },
};

export const SOURCE_IDS = Object.keys(SOURCES);

/** Text list shown to the model so it knows what each ID refers to. */
export const sourceCatalogForPrompt = SOURCE_IDS.map(
  (id) => `- ${id}: ${SOURCES[id].publisher}, ${SOURCES[id].title}`
).join("\n");