import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: GridIcon },
  { to: "/prediction", label: "Prediction", icon: TargetIcon },
  { to: "/feature-importance", label: "Feature Importance", icon: BarsIcon },
  { to: "/model-comparison", label: "Model Comparison", icon: ScaleIcon },
  { to: "/about", label: "About", icon: InfoIcon },
];


const DEFAULT_ICON_SIZE = 15;

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-800/70
        bg-bg-secondary/90 backdrop-blur-md transition-transform duration-200 lg:static lg:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center gap-2.5 px-5 py-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-[0_0_18px_rgba(59,130,246,0.35)]">
            <AirplaneIcon size={17} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight text-white">
              Airline Satisfaction
            </p>
            <p className="text-xs leading-tight text-slate-400">Platform</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-accent-green/15 text-accent-green"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
                }`
              }
            >
              <Icon size={DEFAULT_ICON_SIZE} className="shrink-0 transition-transform duration-200 group-hover:scale-110" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-800/70 px-5 py-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center gap-2 text-xs text-slate-500"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
            System online
          </motion.div>
        </div>
      </aside>
    </>
  );
}

function GridIcon({ size = DEFAULT_ICON_SIZE, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="2.5" y="2.5" width="6" height="6" rx="1.2" />
      <rect x="11.5" y="2.5" width="6" height="6" rx="1.2" />
      <rect x="2.5" y="11.5" width="6" height="6" rx="1.2" />
      <rect x="11.5" y="11.5" width="6" height="6" rx="1.2" />
    </svg>
  );
}
function TargetIcon({ size = DEFAULT_ICON_SIZE, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="10" cy="10" r="7" />
      <circle cx="10" cy="10" r="3.4" />
      <circle cx="10" cy="10" r="0.6" fill="currentColor" />
    </svg>
  );
}
function BarsIcon({ size = DEFAULT_ICON_SIZE, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M3 15V9M8 15V4M13 15v-6M18 15V7" strokeLinecap="round" />
    </svg>
  );
}
function ScaleIcon({ size = DEFAULT_ICON_SIZE, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M10 2.5v15M4 5.5h12M4 5.5 2 10a2.2 2.2 0 0 0 4 0L4 5.5ZM16 5.5l-2 4.5a2.2 2.2 0 0 0 4 0l-2-4.5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function InfoIcon({ size = DEFAULT_ICON_SIZE, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 9v5" strokeLinecap="round" />
      <circle cx="10" cy="6.4" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
function AirplaneIcon({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21 16v-2l-8-5V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2.5 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" />
    </svg>
  );
}
