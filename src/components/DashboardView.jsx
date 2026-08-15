export function StatCard({ title, iconClass, iconColor, current, target, unit, gradient, percentage }) {
  return (
    <div className="p-5 min-h-36 bg-white/10 rounded-3xl border border-white/40 shadow-xl backdrop-blur-3xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl">
      <div className="flex items-center gap-2">
        <i className={`${iconClass} ${iconColor} text-sm`}></i>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
          {title}
        </p>
      </div>
      <p className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 my-2">
        {current}
        {unit && <span className="text-sm font-semibold text-slate-800">{unit} </span>}
        <span className="text-xs font-medium text-slate-500">
          / {target}{unit ? unit : " kcal"}
        </span>
      </p>
      <div className="w-full h-2.5 bg-black/5 rounded-full overflow-hidden">
        <div
          className={`h-full ${gradient} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export function WorkoutGoalsList({ workoutList }) {
  return (
    <div className="h-full bg-white/10 border border-white/40 backdrop-blur-3xl shadow-xl rounded-3xl p-5 sm:p-6 flex flex-col costum-scrollbar">
      <p className="text-sm font-bold tracking-wider text-slate-800 uppercase mb-4">
        Today's GOALS
      </p>

      <div className="flex-1 overflow-y-auto pr-1 min-h-[160px] costum-scrollbar flex flex-col gap-3">
        {workoutList.length === 0 ? (
          <p className="text-slate-500 text-xs font-medium italic p-4 text-center bg-white/5 rounded-2xl border border-white/10">
            No logs added. Please add a log in workout tab.
          </p>
        ) : (
          workoutList.map((workout) => (
            <div
              key={workout.id}
              className="w-full min-h-16 bg-white/40 shadow-xs border border-white/20 rounded-2xl px-4 py-2 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300 shrink-0"
            >
              <div className="pr-2">
                <p className="font-bold text-sm text-slate-900 uppercase tracking-tight break-words">
                  {workout.name}
                </p>
                <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                  Target: {workout.weight}kg × {workout.reps} Reps
                </p>
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg shrink-0">
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
  return (
    <div className="h-full bg-white/10 border border-white/40 backdrop-blur-3xl shadow-xl rounded-3xl p-5 flex flex-col items-center justify-between text-center min-h-[260px]">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Water Intake
        </p>
        <div className="mt-3 sm:mt-4 text-sky-500 animate-bounce duration-1000">
          <i className="fa-solid fa-droplet text-3xl"></i>
        </div>
        <p className="mt-3 sm:mt-4 text-2xl font-black text-slate-900 tracking-tight">
          {waterGlasses}{" "}
          <span className="text-xs font-bold text-slate-400">
            / {targetWaterGlasses}
          </span>
        </p>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
          Glasses Drunk
        </p>
        <p className="text-[11px] font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md mt-2 w-max mx-auto">
          ~{(waterGlasses * 0.25).toFixed(2)}L
        </p>
      </div>

      <div className="flex gap-2.5 w-full justify-center mt-4">
        <button
          onClick={removeWaterGlass}
          className="w-10 h-10 rounded-xl bg-white/40 border border-white/60 text-slate-700 font-bold hover:bg-white/70 transition-all shadow-2xs active:scale-95 text-base cursor-pointer flex items-center justify-center"
          aria-label="Decrease water intake"
        >
          -
        </button>
        <button
          onClick={addWaterGlass}
          className="flex-1 max-w-[80px] h-10 rounded-xl bg-sky-500 border border-sky-400 text-white font-bold hover:bg-sky-600 transition-all shadow-md active:scale-95 text-base cursor-pointer flex items-center justify-center"
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
  return (
    <div className="animate-in fade-in duration-300 slide-in-from-bottom-2 flex flex-col gap-6">
      <h1 className="text-2xl font-black tracking-wider text-slate-900 uppercase">
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
          gradient="bg-linear-to-r from-orange-400 to-amber-500"
          percentage={caloriePercentage}
        />
        <StatCard
          title="Today's Protein"
          iconClass="fa-solid fa-shrimp"
          iconColor="text-sky-500"
          current={currentProtein}
          target={targetProtein}
          unit="g"
          gradient="bg-linear-to-r from-sky-400 to-indigo-500"
          percentage={proteinPercentage}
        />
        {/* Weight Card */}
        <div className="p-5 min-h-36 bg-white/10 rounded-3xl border border-white/40 shadow-xl backdrop-blur-3xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Weight
            </p>
            <p className="text-2xl font-black tracking-tight text-slate-900">
              65
              <span className="text-xs font-bold text-slate-500"> kg</span>
            </p>
          </div>
          <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-md w-max">
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
