import { useLiquidGlass } from "../hooks/useLiquidGlass";

export default function MacroLoggerView({
  currentCalorie,
  targetCalorie,
  currentProtein,
  targetProtein,
  manualCal,
  setManualCal,
  manualProt,
  setManualProt,
  handleQuickLog,
  handleManualLog,
  handleResetIntake,
}) {
  const statusGlassRef = useLiquidGlass({ scale: -90, blur: 12 });
  const presetsGlassRef = useLiquidGlass({ scale: -100, blur: 14 });
  const customGlassRef = useLiquidGlass({ scale: -100, blur: 14 });

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-wider text-slate-900 uppercase drop-shadow-xs">
            Nutrition Tracker
          </h1>
          <p className="text-xs font-bold text-slate-700 mt-0.5">
            Manage your daily caloric and protein intake
          </p>
        </div>
        <button
          onClick={handleResetIntake}
          className="self-start sm:self-auto text-[10px] font-extrabold tracking-wider uppercase bg-white/50 border border-white/70 text-slate-800 px-3.5 py-2 rounded-xl hover:bg-red-100/80 hover:text-red-700 hover:border-red-300 transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          Reset Intake (0)
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Current Status Mini-Card */}
        <div
          ref={statusGlassRef}
          className="liquid-glass-card p-4 border border-white/50 rounded-2xl flex flex-col sm:flex-row justify-around items-center text-center shadow-md gap-3 sm:gap-0"
        >
          <div>
            <p className="text-[10px] font-black uppercase text-slate-700 tracking-wider">
              Current Calories
            </p>
            <p className="text-lg font-black text-slate-950 mt-0.5">
              {currentCalorie} / {targetCalorie} kcal
            </p>
          </div>
          <div className="hidden sm:block w-px bg-slate-900/10 h-8 self-center"></div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-700 tracking-wider">
              Current Protein
            </p>
            <p className="text-lg font-black text-slate-950 mt-0.5">
              {currentProtein}g / {targetProtein}g
            </p>
          </div>
        </div>

        {/* Quick Presets Box */}
        <div
          ref={presetsGlassRef}
          className="liquid-glass p-5 border border-white/50 rounded-3xl shadow-xl"
        >
          <p className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3.5">
            Quick Food Presets
          </p>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => handleQuickLog(70, 6)}
              className="bg-white/60 border border-white hover:bg-white text-slate-900 text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Egg (Whole)</span>{" "}
              <span className="text-[10px] bg-slate-200/90 px-1.5 py-0.5 rounded-md text-slate-700 font-black">
                +6g P
              </span>
            </button>
            <button
              onClick={() => handleQuickLog(165, 30)}
              className="bg-white/60 border border-white hover:bg-white text-slate-900 text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Chicken Breast 100g</span>{" "}
              <span className="text-[10px] bg-slate-200/90 px-1.5 py-0.5 rounded-md text-slate-700 font-black">
                +30g P
              </span>
            </button>
            <button
              onClick={() => handleQuickLog(200, 25)}
              className="bg-white/60 border border-white hover:bg-white text-slate-900 text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Protein Shake</span>{" "}
              <span className="text-[10px] bg-slate-200/90 px-1.5 py-0.5 rounded-md text-slate-700 font-black">
                +25g P
              </span>
            </button>
          </div>
        </div>

        {/* Detailed Custom Form */}
        <div
          ref={customGlassRef}
          className="liquid-glass p-5 border border-white/50 rounded-3xl shadow-xl flex flex-col gap-4"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-slate-900">
              Detailed Custom Log
            </p>
            <p className="text-[10px] text-slate-700 font-bold mt-0.5">
              Manually add or subtract precise nutrient metrics
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center liquid-glass-input px-3 py-2 w-full sm:w-1/2">
              <i className="fa-solid fa-fire text-orange-500 text-sm mr-2.5 shrink-0"></i>
              <input
                type="number"
                value={manualCal}
                onChange={(e) => setManualCal(e.target.value)}
                placeholder="Calories (kcal)"
                className="w-full bg-transparent text-xs font-bold focus:outline-hidden text-slate-950 placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center liquid-glass-input px-3 py-2 w-full sm:w-1/2">
              <i className="fa-solid fa-shrimp text-sky-500 text-sm mr-2.5 shrink-0"></i>
              <input
                type="number"
                value={manualProt}
                onChange={(e) => setManualProt(e.target.value)}
                placeholder="Protein (grams)"
                className="w-full bg-transparent text-xs font-bold focus:outline-hidden text-slate-950 placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-1">
            <button
              onClick={() => handleManualLog("subtract")}
              className="bg-white/50 border border-white/70 hover:bg-red-100 hover:text-red-700 hover:border-red-300 text-slate-800 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <i className="fa-solid fa-minus text-[10px]"></i> Subtract
            </button>
            <button
              onClick={() => handleManualLog("add")}
              className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-extrabold px-6 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer uppercase tracking-wider flex items-center gap-2"
            >
              <i className="fa-solid fa-plus text-[10px]"></i> Add Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
