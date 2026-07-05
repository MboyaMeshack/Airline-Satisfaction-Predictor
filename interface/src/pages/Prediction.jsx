import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageShell from "../components/PageShell.jsx";
import { Card, RatingSlider } from "../components/ui.jsx";
import { predictSatisfaction } from "../api/client.js";

const RATING_FIELDS = [
  "Inflight wifi service",
  "Departure/Arrival time convenient",
  "Ease of Online booking",
  "Gate location",
  "Food and drink",
  "Online boarding",
  "Seat comfort",
  "Inflight entertainment",
  "On-board service",
  "Leg room service",
  "Baggage handling",
  "Checkin service",
  "Inflight service",
  "Cleanliness",
];

const INITIAL_STATE = {
  Gender: "Male",
  "Customer Type": "Loyal Customer",
  Age: 34,
  "Type of Travel": "Business travel",
  Class: "Business",
  "Flight Distance": 1200,
  "Departure Delay in Minutes": 0,
  ...Object.fromEntries(RATING_FIELDS.map((f) => [f, 4])),
};

export default function Prediction() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [status, setStatus] = useState("idle"); 
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const payload = {
        ...form,
        Age: Number(form.Age),
        "Flight Distance": Number(form["Flight Distance"]),
        "Departure Delay in Minutes": Number(form["Departure Delay in Minutes"]),
      };
      const response = await predictSatisfaction(payload);
      setResult(response.prediction);
      setStatus("success");
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong while contacting the prediction service.");
      setStatus("error");
    }
  }

  const isSatisfied = result === "Satisfied";

  return (
    <PageShell title="Prediction" description="Score a passenger satisfaction outcome">
      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-accent-blue">
              Step 1 &middot; Passenger Information
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Gender">
                <select
                  className="input-field"
                  value={form.Gender}
                  onChange={(e) => updateField("Gender", e.target.value)}
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </Field>
              <Field label="Age">
                <input
                  type="number"
                  min={0}
                  max={120}
                  className="input-field"
                  value={form.Age}
                  onChange={(e) => updateField("Age", e.target.value)}
                />
              </Field>
              <Field label="Customer Type">
                <select
                  className="input-field"
                  value={form["Customer Type"]}
                  onChange={(e) => updateField("Customer Type", e.target.value)}
                >
                  <option>Loyal Customer</option>
                  <option>Disloyal Customer</option>
                </select>
              </Field>
              <Field label="Type of Travel">
                <select
                  className="input-field"
                  value={form["Type of Travel"]}
                  onChange={(e) => updateField("Type of Travel", e.target.value)}
                >
                  <option>Business travel</option>
                  <option>Personal Travel</option>
                </select>
              </Field>
              <Field label="Class">
                <select
                  className="input-field"
                  value={form.Class}
                  onChange={(e) => updateField("Class", e.target.value)}
                >
                  <option>Business</option>
                  <option>Eco</option>
                  <option>Eco Plus</option>
                </select>
              </Field>
            </div>
          </Card>

          <Card>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-accent-blue">
              Step 2 &middot; Flight Information
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Flight Distance (km)">
                <input
                  type="number"
                  min={0}
                  className="input-field"
                  value={form["Flight Distance"]}
                  onChange={(e) => updateField("Flight Distance", e.target.value)}
                />
              </Field>
              <Field label="Departure Delay (min)">
                <input
                  type="number"
                  min={0}
                  className="input-field"
                  value={form["Departure Delay in Minutes"]}
                  onChange={(e) => updateField("Departure Delay in Minutes", e.target.value)}
                />
              </Field>
            </div>
          </Card>

          <Card>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-accent-blue">
              Step 3 &middot; Service Ratings
            </p>
            <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {RATING_FIELDS.map((field) => (
                <RatingSlider
                  key={field}
                  label={field}
                  value={form[field]}
                  onChange={(v) => updateField(field, v)}
                />
              ))}
            </div>
          </Card>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-full sm:w-auto"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Predicting…" : "Predict Satisfaction"}
          </motion.button>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <Card noHover className="min-h-[22rem] p-8">
              <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-accent-blue">
                Prediction Result
              </p>

              <AnimatePresence mode="wait">
                {status === "idle" && (
                  <motion.p
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-slate-400"
                  >
                    Fill in the form and run a prediction to see the model's output here.
                  </motion.p>
                )}

                {status === "loading" && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-slate-400"
                  >
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-600 border-t-blue-400" />
                    Contacting prediction service…
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl border border-danger/30 bg-danger/10 p-5"
                  >
                    <p className="text-sm font-semibold text-danger">Prediction failed</p>
                    <p className="mt-1 text-sm text-slate-400">{errorMessage}</p>
                  </motion.div>
                )}

                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.94, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`rounded-xl border p-7 ${
                      isSatisfied
                        ? "border-blue-500/30 bg-blue-500/10"
                        : "border-danger/30 bg-danger/10"
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold uppercase tracking-wide ${
                        isSatisfied ? "text-blue-400" : "text-danger"
                      }`}
                    >
                      Predicted outcome
                    </p>
                    <p
                      className={`mt-3 text-3xl font-bold leading-tight ${
                        isSatisfied ? "text-blue-400" : "text-danger"
                      }`}
                    >
                      {result}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </form>
    </PageShell>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
    </label>
  );
}
