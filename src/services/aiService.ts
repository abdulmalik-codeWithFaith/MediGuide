import type { ChatMessage, HealthResponse } from "../types/health";

/**
 * Talks to OUR backend (server/index.ts), which calls Gemini.
 * The Gemini API key lives only on the server, never in the browser.
 *
 * REACT_APP_API_URL is only the server's address (not a secret).
 * If it's not set, requests go to "/api/chat" and rely on the CRA proxy.
 */
const API_URL = process.env.REACT_APP_API_URL ?? "";

export async function askAssistant(
  question: string,
  previousMessages: ChatMessage[] = []
): Promise<HealthResponse> {
  // Send a short history so follow-up answers have context.
  const history = previousMessages
    .filter((m) => (m.role === "user" ? !!m.text : !!m.response))
    .slice(-6)
    .map((m) => ({
      role: m.role,
      text: m.role === "user" ? (m.text as string) : (m.response as HealthResponse).summary,
    }));

  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, history }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error ?? `Request failed with status ${res.status}`);
  }

  return (await res.json()) as HealthResponse;
}