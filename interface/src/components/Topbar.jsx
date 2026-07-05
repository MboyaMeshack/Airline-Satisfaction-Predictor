export default function Topbar({ title, description, onMenuClick }) {
  return (
    <header className="flex items-center justify-between border-b border-slate-800/70 bg-bg/80 px-5 py-4 backdrop-blur-sm sm:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:text-slate-100 lg:hidden"
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
            <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-semibold text-white sm:text-xl">{title}</h1>
          {description && (
            <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">{description}</p>
          )}
        </div>
      </div>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-200">
        AE
      </div>
    </header>
  );
}
