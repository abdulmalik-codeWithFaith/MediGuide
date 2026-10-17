import "dotenv/config";
import express from "express";
import cors from "cors";
import { generateHealthResponse } from "./gemini";
import { detectSafetyFlag, emergencyResponse, selfHarmResponse } from "./safety";
import type { HistoryItem } from "./types";

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const MAX_QUESTION = 500;
const MAX_HISTORY = 6;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(express.json({ limit: "20kb" }));

// Very small in-memory rate limiter (per IP) to protect your API quota.
const hits = new Map<string, { count: number; reset: number }>();
const LIMIT = 20; // requests
const WINDOW_MS = 60_000; // per minute

function rateLimit(req: express.Request, res: express.Response, next: express.NextFunction) {
  const key = req.ip || "unknown";
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.reset) {
    hits.set(key, { count: 1, reset: now + WINDOW_MS });
    return next();
  }
  if (entry.count >= LIMIT) {
    return res.status(429).json({ error: "Too many requests. Please wait a moment." });
  }
  entry.count++;
  next();
}

function cleanHistory(input: unknown): HistoryItem[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter(
      (h) =>
        (h?.role === "user" || h?.role === "assistant") &&
        typeof h?.text === "string" &&
        h.text.trim()
    )
    .slice(-MAX_HISTORY)
    .map((h) => ({ role: h.role, text: h.text.slice(0, 1000) }));
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/chat", rateLimit, async (req, res) => {
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";

  if (!question) {
    return res.status(400).json({ error: "Please enter a question." });
  }
  if (question.length > MAX_QUESTION) {
    return res.status(400).json({ error: `Questions are limited to ${MAX_QUESTION} characters.` });
  }

  // Step 2 of the brief: check for emergencies before any AI call.
  const flag = detectSafetyFlag(question);
  if (flag === "emergency") return res.json(emergencyResponse);
  if (flag === "self-harm") return res.json(selfHarmResponse);

  try {
    const history = cleanHistory(req.body?.history);
    const answer = await generateHealthResponse(question, history);
    res.json(answer);
  } catch (err) {
    // Log details on the server only. Never send them to the browser.
    console.error("Gemini error:", err instanceof Error ? err.message : err);
    res.status(502).json({
      error: "The assistant could not answer right now. Please try again in a moment.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`MediGuide API running on http://localhost:${PORT}`);
});