import type { HealthResponse } from "./types";
import { SOURCES } from "./sources";

/**
 * Deterministic safety check that runs BEFORE the model is called.
 * Emergency wording gets a fixed, reviewed answer: no AI involved.
 * This is a safety net, not a complete detector. Extend and test it.
 */
const EMERGENCY_PATTERNS: RegExp[] = [
  /can'?t breathe/,
  /cannot breathe/,
  /(difficulty|trouble|struggling) (to )?breath/,
  /chest pain/,
  /pain in (my )?chest/,
  /sudden(ly)? (weak|numb)/,
  /(face|arm|leg) (is )?(droop|numb)/,
  /slurred speech/,
  /(worst|sudden severe|thunderclap) headache/,
  /unconscious/,
  /passed out/,
  /seizure/,
  /coughing (up )?blood/,
  /vomiting blood/,
  /severe bleeding/,
  /overdose/,
];

const SELF_HARM_PATTERNS: RegExp[] = [
  /suicid/,
  /kill myself/,
  /want to die/,
  /end my life/,
  /hurt myself/,
  /harm myself/,
];

const normalise = (text: string) =>
  text.toLowerCase().replace(/[\u2018\u2019]/g, "'");

export type SafetyFlag = "emergency" | "self-harm" | null;

export function detectSafetyFlag(text: string): SafetyFlag {
  const t = normalise(text);
  if (SELF_HARM_PATTERNS.some((p) => p.test(t))) return "self-harm";
  if (EMERGENCY_PATTERNS.some((p) => p.test(t))) return "emergency";
  return null;
}

export const emergencyResponse: HealthResponse = {
  severity: "emergency",
  summary: "What you describe could be serious and needs urgent attention.",
  sections: [
    {
      heading: "Please act now",
      items: [
        "Call your local emergency number or go to the nearest emergency room immediately.",
        "If possible, ask someone to stay with you.",
        "Do not wait for more advice from this app.",
      ],
    },
  ],
  nextStep: "Get emergency medical help right away.",
  sources: [SOURCES["nhs-999"]],
};

export const selfHarmResponse: HealthResponse = {
  severity: "emergency",
  summary:
    "I'm really sorry you're going through this. You deserve support right now, and you don't have to face it alone.",
  sections: [
    {
      heading: "Please reach out now",
      items: [
        "If you might act on these thoughts, call your local emergency number or go to the nearest emergency room.",
        "Contact a crisis line in your country, or someone you trust, and tell them how you feel.",
        "If you can, stay with another person and move away from anything you could use to hurt yourself.",
      ],
    },
  ],
  nextStep:
    "Talk to a doctor, counsellor or trusted person soon about how you've been feeling.",
  sources: [],
};