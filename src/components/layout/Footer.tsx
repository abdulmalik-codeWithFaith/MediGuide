import { HeartPulse } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
                <HeartPulse size={18} />
              </span>
              MediGuide AI
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Clear, friendly health education. Not a replacement for a doctor.
            </p>
          </div>

          <div className="max-w-md rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>In an emergency</strong>, contact your local emergency number or go to the
            nearest hospital immediately. Do not wait for an AI response.
          </div>
        </div>

        <p className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} MediGuide AI. Educational information only, not medical
          advice, diagnosis, or treatment.
        </p>
      </div>
    </footer>
  );
}