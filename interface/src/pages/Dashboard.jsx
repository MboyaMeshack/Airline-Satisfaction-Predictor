import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageShell from "../components/PageShell.jsx";
import { Card } from "../components/ui.jsx";

const HIGHLIGHTS = [
  {
    title: "Business travelers report higher satisfaction",
    body: "Travel purpose and class meaningfully shift the predicted outcome.",
  },
  {
    title: "Online Boarding is the strongest driver",
    body: "Smooth digital boarding is the leading feature shaping passenger satisfaction.",
  },
  {
    title: "XGBoost achieved the best performance",
    body: "Ensemble tree models capture the non-linear interactions in the survey data.",
  },
];

const STATS = [
  { label: "Passengers analysed", value: "129,880" },
  { label: "Features used", value: "22" },
];

export default function Dashboard() {
  return (
    <PageShell title="Dashboard" description="AI-powered passenger satisfaction overview">
      <Card noHover className="relative mb-8 overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-accent-blue/10 blur-3xl" />

        <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 shadow-[0_0_30px_rgba(59,130,246,0.35)]"
          >
            <AirplaneIcon className="h-7 w-7 text-white" />
          </motion.div>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent-blue">
              AI Platform
            </p>
            <h1 className="max-w-2xl text-2xl font-bold text-white sm:text-3xl">
              Airline Satisfaction Prediction
            </h1>
          </div>
        </div>

        <p className="relative mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Predict passenger satisfaction and uncover the factors that drive customer experience
          using a machine learning model trained on airline survey data.
        </p>

        <div className="relative mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: "easeOut" }}
            >
              <p className="text-lg font-bold text-white sm:text-xl">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <Link to="/prediction" className="btn-primary relative mt-7 w-fit !bg-blue-600 hover:!bg-blue-700">
          Predict Satisfaction
        </Link>
       
      </Card>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Highlights
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {HIGHLIGHTS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.4, ease: "easeOut" }}
          >
            <Card>
              <div className="mb-3 h-1.5 w-8 rounded-full bg-gradient-to-r from-accent-teal to-blue-500" />
              <p className="mb-1.5 text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm leading-relaxed text-slate-400">{item.body}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}

function AirplaneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21 16v-2l-8-5V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2.5 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" />
    </svg>
  );
}
