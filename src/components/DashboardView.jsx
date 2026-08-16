import { useLiquidGlass } from "../hooks/useLiquidGlass";

export function StatCard({ title, iconClass, iconColor, current, target, unit, gradient, percentage }) {
  const glassRef = useLiquidGlass({ scale: -90, blur: 12 });

  return (
    <div
      ref={glassRef}
      className="liquid-glass-card p-5 min-h-36 border border-white/50 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
    >
      <div className="flex items-center gap-2">
        <i className={`${iconClass} ${iconColor} text-sm`}></i>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
          {title}
        </p>
      </div>
      <p className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 my-2">
        {current}
        {unit && <span className="text-sm font-bold text-slate-900">{unit} </span>}
        <span className="text-xs font-medium text-slate-600">
          / {target}{unit ? unit : " kcal"}
        </span>
      </p>
      <div className="w-full h-2.5 bg-black/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${gradient} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export function WorkoutGoalsList({ workoutList }) {
  const glassRef = useLiquidGlass({ scale: -100, blur: 14 });

  return (
    <div
      ref={glassRef}
      className="liquid-glass h-full border border-white/50 shadow-xl rounded-3xl p-5 sm:p-6 flex flex-col costum-scrollbar"
    >
      <p className="text-sm font-extrabold tracking-wider text-slate-900 uppercase mb-4">
        Today's GOALS
      </p>

      <div className="flex-1 overflow-y-auto pr-1 min-h-[160px] costum-scrollbar flex flex-col gap-3">
        {workoutList.length === 0 ? (
          <p className="text-slate-600 text-xs font-semibold italic p-4 text-center bg-white/20 rounded-2xl border border-white/30">
            No logs added. Please add a log in workout tab.
          </p>
        ) : (
          workoutList.map((workout) => (
            <div
              key={workout.id}
              className="w-full min-h-16 bg-white/50 shadow-xs border border-white/40 rounded-2xl px-4 py-2 flex items-center justify-between shrink-0 hover:bg-white/60 transition-all"
            >
              <div className="pr-2">
                <p className="font-extrabold text-sm text-slate-950 uppercase tracking-tight break-words">
                  {workout.name}
                </p>
                <p className="text-[11px] text-slate-700 font-bold mt-0.5">
                  Target: {workout.weight}kg × {workout.reps} Reps
                </p>
              </div>
              <span className="text-[10px] font-extrabold tracking-wider uppercase text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg shrink-0 border border-emerald-200">
                Active
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function WaterIntakeTracker({ waterGlasses, targetWaterGlasses, addWaterGlass, removeWaterGlass }) {
  const glassRef = useLiquidGlass({ scale: -100, blur: 14 });

  return (
    <div
      ref={glassRef}
      className="liquid-glass h-full border border-white/50 shadow-xl rounded-3xl p-5 flex flex-col items-center justify-between text-center min-h-[260px]"
    >
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-slate-800">
          Water Intake
        </p>
        <div className="mt-3 sm:mt-4 text-sky-500 animate-bounce duration-1000">
          <i className="fa-solid fa-droplet text-3xl drop-shadow-md"></i>
        </div>
        <p className="mt-3 sm:mt-4 text-2xl font-black text-slate-950 tracking-tight">
          {waterGlasses}{" "}
          <span className="text-xs font-bold text-slate-600">
            / {targetWaterGlasses}
          </span>
        </p>
        <p className="text-[9px] font-extrabold text-slate-600 uppercase tracking-widest mt-1">
          Glasses Drunk
        </p>
        <p className="text-[11px] font-bold text-sky-700 bg-sky-100/80 border border-sky-200 px-2.5 py-0.5 rounded-md mt-2 w-max mx-auto shadow-2xs">
          ~{(waterGlasses * 0.25).toFixed(2)}L
        </p>
      </div>

      <div className="flex gap-2.5 w-full justify-center mt-4">
        <button
          onClick={removeWaterGlass}
          className="w-10 h-10 rounded-xl bg-white/50 border border-white/70 text-slate-800 font-black hover:bg-white/80 transition-all shadow-xs active:scale-95 text-base cursor-pointer flex items-center justify-center"
          aria-label="Decrease water intake"
        >
          -
        </button>
        <button
          onClick={addWaterGlass}
          className="flex-1 max-w-[80px] h-10 rounded-xl bg-sky-500 border border-sky-400 text-white font-extrabold hover:bg-sky-600 transition-all shadow-md active:scale-95 text-base cursor-pointer flex items-center justify-center"
          aria-label="Increase water intake"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function DashboardView({
  profileName,
  currentCalorie,
  targetCalorie,
  currentProtein,
  targetProtein,
  caloriePercentage,
  proteinPercentage,
  workoutList,
  waterGlasses,
  targetWaterGlasses,
  addWaterGlass,
  removeWaterGlass,
}) {
  const weightGlassRef = useLiquidGlass({ scale: -90, blur: 12 });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-black tracking-wider text-slate-900 uppercase drop-shadow-xs">
        WELCOME BACK, {profileName}!
      </h1>

      {/* Responsive Grid for Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <StatCard
          title="Today's Calories"
          iconClass="fa-solid fa-fire"
          iconColor="text-orange-500"
          current={currentCalorie}
          target={targetCalorie}
          unit=""
          gradient="bg-gradient-to-r from-orange-400 to-amber-500"
          percentage={caloriePercentage}
        />
        <StatCard
          title="Today's Protein"
          iconClass="fa-solid fa-shrimp"
          iconColor="text-sky-500"
          current={currentProtein}
          target={targetProtein}
          unit="g"
          gradient="bg-gradient-to-r from-sky-400 to-indigo-500"
          percentage={proteinPercentage}
        />
        {/* Weight Card */}
        <div
          ref={weightGlassRef}
          className="liquid-glass-card p-5 min-h-36 border border-white/50 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">
              Weight
            </p>
            <p className="text-2xl font-black tracking-tight text-slate-950">
              65
              <span className="text-xs font-bold text-slate-600"> kg</span>
            </p>
          </div>
          <p className="text-indigo-700 font-extrabold text-[10px] uppercase tracking-wider bg-indigo-100/80 border border-indigo-200 px-2.5 py-1 rounded-md w-max shadow-2xs">
            Target: 70kg
          </p>
        </div>
      </div>

      {/* Main Bottom Section: Goals & Water */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2 min-h-[320px]">
          <WorkoutGoalsList workoutList={workoutList} />
        </div>
        <div className="lg:col-span-1 min-h-[320px]">
          <WaterIntakeTracker
            waterGlasses={waterGlasses}
            targetWaterGlasses={targetWaterGlasses}
            addWaterGlass={addWaterGlass}
            removeWaterGlass={removeWaterGlass}
          />
        </div>
      </div>
    </div>
  );
}
