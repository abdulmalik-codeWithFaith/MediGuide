import { motion } from "framer-motion";
import { HeartPulse, User } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "../../types/health";
import ResponseCard from "./ResponseCard";

export default function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser ? "bg-slate-200 text-slate-600" : "bg-teal-600 text-white"
        }`}
      >
        {isUser ? <User size={16} /> : <HeartPulse size={16} />}
      </span>

      <div className={`max-w-[85%] ${isUser ? "text-right" : ""}`}>
        {isUser && (
          <div className="inline-block whitespace-pre-wrap rounded-2xl rounded-br-sm bg-teal-600 px-4 py-2.5 text-left text-sm text-white">
            {message.text}
          </div>
        )}

        {!isUser && message.response && <ResponseCard response={message.response} />}

        {!isUser && message.isError && (
          <div className="rounded-2xl rounded-bl-sm border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-800">
            {message.text}
          </div>
        )}
      </div>
    </motion.div>
  );
}