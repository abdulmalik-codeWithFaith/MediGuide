import type { ReactNode } from "react";
import { AlertTriangle, ArrowRight, ExternalLink, Info, ShieldAlert } from "lucide-react";
import type { HealthResponse, Severity } from "../../types/health";

const severityStyles: Record<
  Severity,
  { wrapper: string; label: string; icon: ReactNode; text: string }
> = {
  info: {
    wrapper: "border-slate-100 bg-white",
    label: "text-teal-700",
    icon: <Info size={16} />,
    text: "Your health guidance",
  },
  caution: {
    wrapper: "border-amber-200 bg-amber-50/40",
    label: "text-amber-700",
    icon: <AlertTriangle size={16} />,
    text: "Your health guidance · take care",
  },
  emergency: {
    wrapper: "border-red-300 bg-red-50",
    label: "text-red-700",
    icon: <ShieldAlert size={16} />,
    text: "Seek urgent help",
  },
};

export default function ResponseCard({ response }: { response: HealthResponse }) {
  const s = severityStyles[response.severity];

  return (
    <div className={`rounded-2xl rounded-bl-sm border p-4 text-sm shadow-sm ${s.wrapper}`}>
      <p className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide ${s.label}`}>
        {s.icon} {s.text}
      </p>

      <p className="mt-2 text-slate-800">{response.summary}</p>

      {response.sections.map((section) => (
        <div key={section.heading} className="mt-4">
          <h4 className="font-semibold text-slate-900">{section.heading}</h4>
          {section.body && <p className="mt-1 text-slate-600">{section.body}</p>}
          {section.items && (
            <ul className="mt-1 list-disc space-y-1 pl-5 text-slate-600">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <div
        className={`mt-4 flex gap-2 rounded-lg border p-3 ${
          response.severity === "emergency"
            ? "border-red-200 bg-white text-red-800"
            : "border-teal-100 bg-teal-50 text-slate-700"
        }`}
      >
        <ArrowRight size={16} className="mt-0.5 shrink-0" />
        <p>
          <strong>Next step:</strong> {response.nextStep}
        </p>
      </div>

      {response.sources.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-slate-500">Sources</p>
          <ul className="mt-1 space-y-1">
            {response.sources.map((src) => (
              <li key={src.url}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-teal-700 hover:underline"
                >
                  {src.publisher}: {src.title} <ExternalLink size={12} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 border-t border-slate-100 pt-2 text-xs text-slate-500">
        AI-generated educational information. Not a diagnosis or a substitute for professional
        medical advice.
      </p>
    </div>
  );
}