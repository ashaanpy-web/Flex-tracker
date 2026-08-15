export default function Header({ mobileOpen, setMobileOpen, profileName }) {
  return (
    <header className="flex lg:hidden items-center justify-between p-4 mb-4 bg-white/20 border border-white/40 backdrop-blur-2xl rounded-2xl shadow-sm z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-800 hover:bg-white/40 rounded-xl transition-all"
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
      <div className="text-xs font-bold text-slate-700 bg-white/40 px-3 py-1.5 rounded-xl border border-white/60">
        <i className="fa-solid fa-user text-slate-500 mr-1.5"></i>
        {profileName}
      </div>
    </header>
  );
}
