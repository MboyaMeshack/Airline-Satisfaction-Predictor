import { motion } from "framer-motion";
import PageShell from "../components/PageShell.jsx";
import { Card } from "../components/ui.jsx";

export default function About() {
  return (
    <PageShell title="About" description="Platform overview">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-blue">
            Platform
          </p>
          <h2 className="mb-3 text-xl font-semibold text-white">
            AI-powered airline customer analytics
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            A platform that helps airline executives, business analysts and data scientists
            understand what drives passenger satisfaction. Built on a machine learning model
            trained over 129,880 airline survey responses, it predicts satisfaction outcomes for
            a given passenger and flight profile via a dedicated prediction API.
          </p>
        </Card>
      </motion.div>
    </PageShell>
  );
}
