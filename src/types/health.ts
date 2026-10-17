export type Severity = "info" | "caution" | "emergency";

export interface HealthSource {
  title: string;
  publisher: string;
  url: string;
}

export interface ResponseSection {
  heading: string;
  body?: string;
  items?: string[];
}

/** The structured shape the AI backend must return. */
export interface HealthResponse {
  severity: Severity;
  summary: string;
  sections: ResponseSection[];
  nextStep: string;
  sources: HealthSource[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text?: string; // user text, or plain error text
  response?: HealthResponse; // assistant structured answer
  isError?: boolean;
}