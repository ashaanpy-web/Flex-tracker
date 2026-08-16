import { useLiquidGlass } from "../hooks/useLiquidGlass";

export default function Header({ mobileOpen, setMobileOpen, profileName }) {
  const glassRef = useLiquidGlass({ scale: -80, blur: 12 });

  return (
    <header
      ref={glassRef}
      className="liquid-glass flex lg:hidden items-center justify-between p-4 mb-4 border border-white/50 shadow-md z-20"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-900 hover:bg-white/40 rounded-xl transition-all"
          aria-label="Toggle navigation menu"
        >
          <i className="fa-solid fa-bars text-lg"></i>
        </button>
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 h-3 w-3 rounded-full animate-pulse"></div>
          <span className="text-slate-900 font-extrabold text-lg tracking-tight">
            Flextracker
          </span>
        </div>
      </div>
      <div className="text-xs font-bold text-slate-800 bg-white/40 px-3 py-1.5 rounded-xl border border-white/60 shadow-xs">
        <i className="fa-solid fa-user text-slate-600 mr-1.5"></i>
        {profileName}
      </div>
    </header>
  );
}
