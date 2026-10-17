import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Stethoscope,
  Apple,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  AlertTriangle,
  Search,
  ListChecks,
  FileText,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
}

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: MessageCircle,
    title: "AI Health Assistant",
    description:
      "Ask health questions in everyday language and get clear, structured answers with sources.",
    to: "/assistant",
  },
  {
    icon: Stethoscope,
    title: "Symptom Guidance",
    description:
      "Describe a symptom and learn what it may mean, what you can do, and when to see a professional.",
    to: "/symptom-checker",
  },
  {
    icon: Apple,
    title: "Food Guidance",
    description:
      "Explore general dietary guidance for conditions like HIV, hepatitis, diabetes and hypertension.",
    to: "/food-guidance",
  },
  {
    icon: BookOpen,
    title: "Health Library",
    description:
      "Browse simple, source-linked articles on conditions, nutrition, prevention and healthy living.",
    to: "/health-library",
  },
];

const steps: Step[] = [
  {
    icon: Search,
    title: "Describe your concern",
    description: "Type what you're experiencing or what you want to understand.",
  },
  {
    icon: AlertTriangle,
    title: "Safety check first",
    description: "We look for emergency warning signs before anything else.",
  },
  {
    icon: FileText,
    title: "Trusted information",
    description: "Answers are grounded in reliable health sources, not guesswork.",
  },
  {
    icon: ListChecks,
    title: "Clear next steps",
    description: "Get simple guidance and know when to talk to a healthcare professional.",
  },
];

const safetyPoints = [
  "Never gives a diagnosis. It explains, it doesn't replace your doctor.",
  "Flags emergency warning signs and tells you to seek urgent care.",
  "Never advises stopping prescribed medication, including HIV treatment.",
  "Shows real, traceable sources such as WHO and NHS guidance.",
  "Your health history is optional and private.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 to-white">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">
                <Sparkles size={14} /> AI-powered health education
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
                Understand your health, <span className="text-teal-600">in plain language.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-slate-600">
                MediGuide AI helps you make sense of symptoms, conditions and nutrition, and tells
                you when it's time to see a professional.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/assistant"
                  className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-teal-700"
                >
                  Start a conversation <ArrowRight size={18} />
                </Link>
                <Link
                  to="/symptom-checker"
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
                >
                  Check a symptom
                </Link>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Educational information only. Not a diagnosis.
              </p>
            </motion.div>

            {/* Chat preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xl"
            >
              <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-teal-600 px-4 py-2.5 text-sm text-white">
                I have hepatitis. What foods should I avoid?
              </div>

              <div className="mt-4 rounded-2xl rounded-bl-sm bg-slate-50 p-4 text-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                  Your health guidance
                </p>
                <p className="mt-2 font-semibold text-slate-900">Be cautious with:</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-slate-600">
                  <li>Alcohol, which can worsen liver injury</li>
                  <li>Raw or undercooked shellfish</li>
                  <li>Herbal remedies, unless a clinician approves them</li>
                </ul>
                <div className="mt-3 rounded-lg border border-teal-100 bg-teal-50 p-3 text-slate-700">
                  <strong>Next step:</strong> talk to a healthcare professional about your
                  specific condition and medicines.
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Sources: WHO, NHS · Educational information, not a diagnosis
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold text-slate-900">Everything in one health companion</h2>
            <p className="mt-3 text-slate-600">
              Four simple tools to help you learn, plan and act with confidence.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    to={f.to}
                    className="group block h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition group-hover:bg-teal-600 group-hover:text-white">
                      <Icon size={24} />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">{f.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{f.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-center text-3xl font-bold text-slate-900">How it works</h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="text-center"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-teal-600 shadow">
                      <Icon size={26} />
                    </div>
                    <p className="mt-4 text-xs font-bold uppercase tracking-wider text-teal-600">
                      Step {i + 1}
                    </p>
                    <h3 className="mt-1 font-semibold text-slate-900">{s.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{s.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SAFETY */}
        <section id="safety" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-white">
                <ShieldCheck size={26} />
              </span>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">Built with safety first</h2>
              <p className="mt-3 text-slate-600">
                Health is sensitive. MediGuide AI is designed to educate responsibly and send you
                to real care when it matters.
              </p>
            </motion.div>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-3"
            >
              {safetyPoints.map((p) => (
                <li
                  key={p}
                  className="flex gap-3 rounded-xl border border-slate-100 bg-white p-4 text-sm text-slate-700 shadow-sm"
                >
                  <ShieldCheck size={18} className="mt-0.5 shrink-0 text-teal-600" />
                  {p}
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-16 sm:px-6 md:pb-20">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-teal-600 to-emerald-500 px-6 py-12 text-center text-white shadow-lg">
            <h2 className="text-3xl font-bold">Have a health question?</h2>
            <p className="mx-auto mt-3 max-w-xl text-teal-50">
              Ask in your own words and get clear, sourced guidance in seconds.
            </p>
            <Link
              to="/assistant"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-teal-700 transition hover:bg-teal-50"
            >
              Ask MediGuide AI <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}