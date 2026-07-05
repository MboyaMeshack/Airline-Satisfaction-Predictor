import PageShell from "../components/PageShell.jsx";
import { Card, SectionHeading, Badge } from "../components/ui.jsx";


const MODELS = [
  { name: "Tuned-XGBoost", accuracy: 96.49, best: true },
  { name: "Random Forest", accuracy: 96.27 },
  { name: "Decision Tree", accuracy: 94.88 },
  { name: "SVM", accuracy: 93.72 },
  { name: "Logistic Regression", accuracy: 87.41 },
];

const OBSERVATIONS = [
  {
    model: "Tuned-XGBoost",
    accuracy: "96.49%",
    body: "Highest accuracy of all models tested, making it the best-performing classifier for this task.",
  },
  {
    model: "Random Forest",
    accuracy: "96.27%",
    body: "Performs almost identically to XGBoost, showing that ensemble tree-based models are highly effective.",
  },
  {
    model: "Decision Tree",
    accuracy: "94.88%",
    body: "Lower accuracy suggests a single tree struggles to capture the complexity of the data versus ensembles.",
  },
  {
    model: "Support Vector Machine",
    accuracy: "93.72%",
    body: "Reasonably strong, but still trails the tree-based ensemble methods on this dataset.",
  },
  {
    model: "Logistic Regression",
    accuracy: "87.41%",
    body: "Lowest accuracy — linear models struggle to capture the nonlinear relationships present in the data.",
  },
];

export default function ModelComparison() {
  return (
    <PageShell title="Model Comparison" description="Benchmark across algorithms">
      <div className="mb-6 flex items-center justify-between">
        <SectionHeading eyebrow="Comparison" title="Model Accuracy" />
      </div>

      <Card className="mb-8 overflow-hidden !p-0">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-500">
              <th className="px-6 py-3 font-medium">Model</th>
              <th className="px-6 py-3 font-medium text-right">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {MODELS.map((m) => (
              <tr
                key={m.name}
                className={`border-b border-slate-800/60 last:border-0 ${
                  m.best ? "bg-accent-teal/[0.06]" : ""
                }`}
              >
                <td className="px-6 py-4 font-medium text-slate-100">
                  <div className="flex items-center gap-2">
                    {m.name}
                    {m.best && <Badge tone="blue">Best Model</Badge>}
                  </div>
                </td>
                <td
                  className={`px-6 py-4 text-right font-semibold ${
                    m.best ? "text-accent-teal" : "text-slate-300"
                  }`}
                >
                  {m.accuracy.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <SectionHeading title="Observations" className="mb-4" />
      <div className="space-y-3">
        {OBSERVATIONS.map((o) => (
          <Card key={o.model} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
            <div className="flex shrink-0 items-baseline gap-2 sm:w-56">
              <span className="text-sm font-semibold text-white">{o.model}</span>
              <span className="text-sm font-semibold text-accent-teal">{o.accuracy}</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">{o.body}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent-blue">
          Summary
        </p>
        <p className="mb-1.5 text-sm font-semibold text-white">Ensemble models lead the field</p>
        <p className="text-sm leading-relaxed text-slate-400">
          Overall, the results show that ensemble models (Random Forest and Tuned-XGBoost) outperform
          simpler models, suggesting that passenger satisfaction is influenced by complex
          interactions between service quality variables and travel characteristics.
        </p>
      </Card>
    </PageShell>
  );
}
