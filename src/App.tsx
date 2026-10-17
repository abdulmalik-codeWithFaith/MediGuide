import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Assistant from "./pages/Assistant";

// Temporary placeholder until each page is built
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      <p className="text-slate-600">This page is coming soon.</p>
      <Link to="/" className="font-semibold text-teal-600 hover:underline">
        ← Back home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/symptom-checker" element={<ComingSoon title="Symptom Checker" />} />
        <Route path="/food-guidance" element={<ComingSoon title="Food Guidance" />} />
        <Route path="/health-library" element={<ComingSoon title="Health Library" />} />
        <Route path="*" element={<ComingSoon title="Page not found" />} />
      </Routes>
    </BrowserRouter>
  );
}