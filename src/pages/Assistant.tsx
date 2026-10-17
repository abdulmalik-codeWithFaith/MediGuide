import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, HeartPulse, ShieldCheck } from "lucide-react";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";
import { askAssistant } from "../services/aiService";
import type { ChatMessage as ChatMessageType } from "../types/health";

const suggestions = [
  "I've had a headache since yesterday",
  "What foods should someone with hepatitis avoid?",
  "Healthy habits for living with HIV",
  "How can I lower my blood pressure with diet?",
];

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export default function Assistant() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (text: string) => {
    const userMsg: ChatMessageType = { id: makeId(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await askAssistant(text, messages);
      setMessages((prev) => [...prev, { id: makeId(), role: "assistant", response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "assistant",
          isError: true,
          text: "Sorry, something went wrong while getting your answer. Please try again. If this is urgent, contact a healthcare professional or emergency services.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link
            to="/"
            className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-teal-700"
          >
            <ArrowLeft size={16} /> Home
          </Link>
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
              <HeartPulse size={18} />
            </span>
            MediGuide Assistant
          </div>
          <span className="w-12" />
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-10 text-center"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-white">
                <HeartPulse size={28} />
              </span>
              <h1 className="mt-4 text-2xl font-bold text-slate-900">How can I help today?</h1>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                Ask about symptoms, conditions or nutrition. I share educational information, not
                diagnoses.
              </p>

              <div className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <p className="mx-auto mt-8 flex max-w-md items-start justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck size={14} className="mt-0.5 shrink-0 text-teal-600" />
                In an emergency, contact your local emergency number immediately.
              </p>
            </motion.div>
          )}

          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}

          {loading && (
            <div className="flex items-center gap-3" aria-live="polite">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white">
                <HeartPulse size={16} />
              </span>
              <div className="flex gap-1 rounded-2xl bg-white px-4 py-3 shadow-sm">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-2 w-2 rounded-full bg-teal-400"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
              <span className="sr-only">MediGuide is preparing a response</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      {/* Input */}
      <footer className="border-t border-slate-100 bg-slate-50 px-4 py-3">
        <ChatInput onSend={handleSend} disabled={loading} />
      </footer>
    </div>
  );
}