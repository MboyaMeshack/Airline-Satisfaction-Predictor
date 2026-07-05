import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { motion } from "framer-motion";
import PageShell from "../components/PageShell.jsx";
import { Card, SectionHeading, Badge } from "../components/ui.jsx";

// Descending order: most influential first (top-most, longest bar), least
// influential last. Mirrors the tuned XGBoost feature_importances_ ranking
// from the notebook. Values are relative/illustrative — no value labels are
// shown in the UI, only the ranking itself.
const FEATURES = [
  { name: "Online boarding", value: 100 },
  { name: "Type of Travel", value: 78 },
  { name: "Inflight wifi service", value: 66 },
  { name: "Customer Type", value: 58 },
  { name: "Class", value: 52 },
  { name: "Inflight entertainment", value: 41 },
  { name: "Ease of Online booking", value: 37 },
  { name: "Checkin service", value: 33 },
  { name: "Leg room service", value: 30 },
  { name: "Seat comfort", value: 27 },
  { name: "Baggage handling", value: 23 },
  { name: "Cleanliness", value: 20 },
  { name: "Gate location", value: 17 },
  { name: "On-board service", value: 15 },
  { name: "Inflight service", value: 13 },
  { name: "Departure/Arrival time convenient", value: 11 },
  { name: "Age", value: 8 },
  { name: "Food and drink", value: 7 },
  { name: "Flight Distance", value: 5 },
  { name: "Departure Delay in Minutes", value: 4 },
  { name: "Gender", value: 2 },
];

const INSIGHTS = [
  {
    eyebrow: "Top Driver",
    title: "Online Boarding leads the model",
    body: "Online Boarding is by far the most influential feature, indicating that the efficiency and experience of the boarding process plays a major role in determining overall passenger satisfaction.",
  },
  {
    eyebrow: "Passenger Context",
    title: "Type of Travel matters next",
    body: "The second most important feature is Type of Travel, suggesting that whether a passenger is travelling for business or personal reasons significantly influences satisfaction levels.",
  },
  {
    eyebrow: "Service Quality",
    title: "Service & class shape the experience",
    body: "Inflight WiFi Service, Customer Type and Class are also highly influential, indicating that service quality, passenger category and travel class are key determinants of satisfaction. Entertainment, seat comfort, leg room and check-in service contribute meaningfully too.",
  },
  {
    eyebrow: "Low Impact",
    title: "Demographics play a minor role",
    body: "Age, Flight Distance, Departure Delay and Gender show very low importance, suggesting demographic characteristics and flight duration have only a minor influence on satisfaction in this dataset.",
  },
];

export default function FeatureImportance() {
  return (
    <PageShell title="Feature Importance" description="What drives passenger satisfaction">
      <div className="mb-6 flex items-center justify-between">
        <SectionHeading eyebrow="model" title="Feature Importance" />
        <Badge tone="teal">Descending</Badge>
      </div>

      <Card noHover className="mb-8">
        <ResponsiveContainer width="100%" height={620}>
          <BarChart
            data={FEATURES}
            layout="vertical"
            margin={{ top: 10, right: 24, bottom: 10, left: 4 }}
          >
            <XAxis type="number" hide domain={[0, "dataMax"]} />
            <YAxis
              dataKey="name"
              type="category"
              interval={0}
              width={190}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={{ stroke: "#334155" }}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.06)" }}
              contentStyle={{
                background: "#111827",
                border: "1px solid #334155",
                borderRadius: 10,
                fontSize: 12,
              }}
              labelStyle={{ color: "#e2e8f0" }}
              formatter={() => ["", ""]}
              labelFormatter={(label) => label}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={18} animationDuration={900} animationEasing="ease-out">
              {FEATURES.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={index < 5 ? "#3665b2" : "#334155"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <SectionHeading title="Interpretation of Results" className="mb-4" />
      <div className="grid gap-4 sm:grid-cols-2">
        {INSIGHTS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
          >
            <Card>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent-blue">
                {item.eyebrow}
              </p>
              <p className="mb-1.5 text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm leading-relaxed text-slate-400">{item.body}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="mt-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent-blue">
          Summary
        </p>
        <p className="mb-1.5 text-sm font-semibold text-white">
          Service quality drives satisfaction
        </p>
        <p className="text-sm leading-relaxed text-slate-400">
          Overall, the results indicate that service quality and passenger experience variables
          are the primary drivers of satisfaction, while demographic or operational factors play
          a smaller role in determining passenger satisfaction outcomes.
        </p>
      </Card>
    </PageShell>
  );
}