import { motion } from "framer-motion";

export function Card({ className = "", children, noHover = false, ...props }) {
  return (
    <motion.div
      className={`card p-6 ${className}`}
      whileHover={noHover ? undefined : { y: -3, transition: { duration: 0.2, ease: "easeOut" } }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, className = "" }) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent-blue">
          {eyebrow}
        </p>
      )}
      <h2 className="text-lg font-semibold text-white sm:text-xl">{title}</h2>
    </div>
  );
}

export function Badge({ children, tone = "teal" }) {
  const tones = {
    teal: "bg-accent-green/15 text-accent-green border-accent-blue/30",
    blue: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    slate: "bg-slate-800 text-slate-300 border-slate-700",
    success: "bg-success/15 text-success border-success/30",
    danger: "bg-danger/15 text-danger border-danger/30",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function RatingSlider({ label, value, onChange }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="w-6 text-right text-sm font-semibold text-accent-green">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={5}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-green-500 transition-shadow"
      />
    </div>
  );
}
