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
  return (
    <div className="animate-in fade-in duration-300 slide-in-from-bottom-2 flex flex-col gap-6 max-w-4xl">
      <h1 className="text-2xl font-black tracking-wider text-slate-900 uppercase">
        SETTINGS
      </h1>
      <div className="p-5 sm:p-6 bg-white/10 border border-white/40 backdrop-blur-3xl shadow-xl rounded-3xl">
        <p className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">
          Configurations
        </p>
        <div className="flex flex-col gap-3">
          {/* Name Edit */}
          <div className="w-full min-h-14 bg-white/20 rounded-2xl p-4 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <span className="text-sm font-bold text-slate-700 shrink-0">
              Profile Name:
            </span>
            {editMode.name ? (
              <div className="flex items-center gap-2 w-full justify-end">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="bg-white/70 px-3 py-1.5 rounded-xl border border-black/5 focus:outline-hidden text-sm w-full sm:w-48 text-left sm:text-right font-medium text-slate-900"
                />
                <button
                  onClick={handleSaveName}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer shrink-0"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full">
                <span className="text-sm text-slate-600 font-semibold italic">
                  {profileName}
                </span>
                <button
                  onClick={() =>
                    setEditMode({ ...editMode, name: true })
                  }
                  className="bg-white/40 border border-white/60 px-3 py-1 rounded-xl text-xs font-bold text-slate-700 hover:bg-white/60 cursor-pointer"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Calorie Edit */}
          <div className="w-full min-h-14 bg-white/20 rounded-2xl p-4 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <span className="text-sm font-bold text-slate-700 shrink-0">
              Daily Calorie Goal:
            </span>
            {editMode.calorie ? (
              <div className="flex items-center gap-2 w-full justify-end">
                <input
                  type="number"
                  value={tempCalorie}
                  onChange={(e) => setTempCalorie(e.target.value)}
                  className="bg-white/70 px-3 py-1.5 rounded-xl border border-black/5 focus:outline-hidden text-sm w-full sm:w-32 text-left sm:text-right font-medium text-slate-900"
                />
                <button
                  onClick={handleSaveCalorie}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer shrink-0"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full">
                <span className="text-sm text-slate-600 font-semibold italic">
                  {targetCalorie} kcal
                </span>
                <button
                  onClick={() =>
                    setEditMode({ ...editMode, calorie: true })
                  }
                  className="bg-white/40 border border-white/60 px-3 py-1 rounded-xl text-xs font-bold text-slate-700 hover:bg-white/60 cursor-pointer"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Protein Edit */}
          <div className="w-full min-h-14 bg-white/20 rounded-2xl p-4 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <span className="text-sm font-bold text-slate-700 shrink-0">
              Daily Protein Goal:
            </span>
            {editMode.protein ? (
              <div className="flex items-center gap-2 w-full justify-end">
                <input
                  type="number"
                  value={tempProtein}
                  onChange={(e) => setTempProtein(e.target.value)}
                  className="bg-white/70 px-3 py-1.5 rounded-xl border border-black/5 focus:outline-hidden text-sm w-full sm:w-32 text-left sm:text-right font-medium text-slate-900"
                />
                <button
                  onClick={handleSaveProtein}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer shrink-0"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full">
                <span className="text-sm text-slate-600 font-semibold italic">
                  {targetProtein}g
                </span>
                <button
                  onClick={() =>
                    setEditMode({ ...editMode, protein: true })
                  }
                  className="bg-white/40 border border-white/60 px-3 py-1 rounded-xl text-xs font-bold text-slate-700 hover:bg-white/60 cursor-pointer"
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
