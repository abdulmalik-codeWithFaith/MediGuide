// Keep this in sync with src/types/health.ts on the frontend.

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

export interface HealthResponse {
  severity: Severity;
  summary: string;
  sections: ResponseSection[];
  nextStep: string;
  sources: HealthSource[];
}

export interface HistoryItem {
  role: "user" | "assistant";
  text: string;
}