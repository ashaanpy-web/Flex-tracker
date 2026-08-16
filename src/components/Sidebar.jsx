import { useLiquidGlass } from "../hooks/useLiquidGlass";

export default function Sidebar({
  activeTab,
  setActiveTab,
  onOpenSettings,
  mobileOpen,
  setMobileOpen,
}) {
  const glassRef = useLiquidGlass({ scale: -120, blur: 16, saturate: 1.8 });

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "fa-solid fa-house",
    },
    {
      id: "workout",
      label: "Workout log",
      icon: "fa-solid fa-dumbbell",
    },
    {
      id: "logger",
      label: "Macro Logger",
      icon: "fa-solid fa-utensils",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "fa-solid fa-gear",
    },
  ];

  const handleTabClick = (id) => {
    if (id === "settings" && onOpenSettings) {
      onOpenSettings();
    } else {
      setActiveTab(id);
    }
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        ref={glassRef}
        className="liquid-glass hidden lg:flex flex-col z-20 w-64 shrink-0 h-[calc(100vh-2.5rem)] rounded-3xl p-4 shadow-2xl no-scrollbar sticky top-5 text-slate-900 border border-white/40"
      >
        <div className="mt-2 px-1">
          <div className="flex items-center gap-3 pl-2 mb-8">
            <div className="bg-slate-900 h-4 w-4 rounded-full animate-pulse duration-1000 shrink-0"></div>
            <p className="text-slate-900 font-black text-2xl tracking-tight">
              Flextracker
            </p>
          </div>

          <nav className="flex flex-col gap-2.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`text-sm font-bold p-3.5 rounded-2xl flex items-center gap-3 cursor-pointer transition-all duration-300 tracking-wide text-left ${
                    isActive
                      ? "bg-white/90 border border-white text-slate-950 shadow-lg scale-[1.02]"
                      : "bg-white/20 border border-white/30 text-slate-800 hover:bg-white/40 hover:scale-[1.01]"
                  }`}
                >
                  <i className={`${item.icon} text-xs w-4 text-center`}></i>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 liquid-glass border-r border-white/50 p-5 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-between ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/30">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 h-4 w-4 rounded-full animate-pulse"></div>
              <span className="text-slate-900 font-extrabold text-xl tracking-tight">
                Flextracker
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-slate-700 hover:text-slate-950 transition-colors"
              aria-label="Close menu"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <nav className="flex flex-col gap-2.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`text-sm font-semibold p-3.5 rounded-2xl flex items-center gap-3 cursor-pointer transition-all duration-300 tracking-wide text-left ${
                    isActive
                      ? "bg-slate-950 border border-slate-900 text-white shadow-md"
                      : "bg-white/30 border border-white/40 text-slate-800 hover:bg-white/50"
                  }`}
                >
                  <i className={`${item.icon} text-sm w-5 text-center`}></i>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="text-xs text-slate-600 font-medium text-center py-2">
          Flex Tracker &copy; {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
}
