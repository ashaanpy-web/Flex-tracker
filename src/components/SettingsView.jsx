import { useLiquidGlass } from "../hooks/useLiquidGlass";

export default function SettingsView({
  profileName,
  targetCalorie,
  targetProtein,
  editMode,
  setEditMode,
  tempName,
  setTempName,
  tempCalorie,
  setTempCalorie,
  tempProtein,
  setTempProtein,
  handleSaveName,
  handleSaveCalorie,
  handleSaveProtein,
}) {
  const settingsGlassRef = useLiquidGlass({ scale: -100, blur: 14 });

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <h1 className="text-2xl font-black tracking-wider text-slate-900 uppercase drop-shadow-xs">
        SETTINGS
      </h1>
      <div
        ref={settingsGlassRef}
        className="liquid-glass p-5 sm:p-6 border border-white/50 shadow-xl rounded-3xl"
      >
        <p className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4">
          Configurations
        </p>
        <div className="flex flex-col gap-3">
          {/* Name Edit */}
          <div className="w-full min-h-14 bg-white/40 rounded-2xl p-4 border border-white/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-2xs">
            <span className="text-sm font-extrabold text-slate-800 shrink-0">
              Profile Name:
            </span>
            {editMode.name ? (
              <div className="flex items-center gap-2 w-full justify-end">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="liquid-glass-input px-3 py-1.5 focus:outline-hidden text-sm w-full sm:w-48 text-left sm:text-right font-bold text-slate-950"
                />
                <button
                  onClick={handleSaveName}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-xs cursor-pointer shrink-0"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full">
                <span className="text-sm text-slate-900 font-bold italic">
                  {profileName}
                </span>
                <button
                  onClick={() =>
                    setEditMode({ ...editMode, name: true })
                  }
                  className="bg-white/50 border border-white/70 px-3 py-1 rounded-xl text-xs font-black text-slate-800 hover:bg-white/80 cursor-pointer shadow-2xs"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Calorie Edit */}
          <div className="w-full min-h-14 bg-white/40 rounded-2xl p-4 border border-white/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-2xs">
            <span className="text-sm font-extrabold text-slate-800 shrink-0">
              Daily Calorie Goal:
            </span>
            {editMode.calorie ? (
              <div className="flex items-center gap-2 w-full justify-end">
                <input
                  type="number"
                  value={tempCalorie}
                  onChange={(e) => setTempCalorie(e.target.value)}
                  className="liquid-glass-input px-3 py-1.5 focus:outline-hidden text-sm w-full sm:w-32 text-left sm:text-right font-bold text-slate-950"
                />
                <button
                  onClick={handleSaveCalorie}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-xs cursor-pointer shrink-0"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full">
                <span className="text-sm text-slate-900 font-bold italic">
                  {targetCalorie} kcal
                </span>
                <button
                  onClick={() =>
                    setEditMode({ ...editMode, calorie: true })
                  }
                  className="bg-white/50 border border-white/70 px-3 py-1 rounded-xl text-xs font-black text-slate-800 hover:bg-white/80 cursor-pointer shadow-2xs"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Protein Edit */}
          <div className="w-full min-h-14 bg-white/40 rounded-2xl p-4 border border-white/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-2xs">
            <span className="text-sm font-extrabold text-slate-800 shrink-0">
              Daily Protein Goal:
            </span>
            {editMode.protein ? (
              <div className="flex items-center gap-2 w-full justify-end">
                <input
                  type="number"
                  value={tempProtein}
                  onChange={(e) => setTempProtein(e.target.value)}
                  className="liquid-glass-input px-3 py-1.5 focus:outline-hidden text-sm w-full sm:w-32 text-left sm:text-right font-bold text-slate-950"
                />
                <button
                  onClick={handleSaveProtein}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-xs cursor-pointer shrink-0"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full">
                <span className="text-sm text-slate-900 font-bold italic">
                  {targetProtein}g
                </span>
                <button
                  onClick={() =>
                    setEditMode({ ...editMode, protein: true })
                  }
                  className="bg-white/50 border border-white/70 px-3 py-1 rounded-xl text-xs font-black text-slate-800 hover:bg-white/80 cursor-pointer shadow-2xs"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
