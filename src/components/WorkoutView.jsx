export function RestTimer({
  timeLeft,
  setTimeLeft,
  isTimerRunning,
  setIsTimerRunning,
}) {
  const toggleTimer = () => setIsTimerRunning((prev) => !prev);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="h-full bg-white/10 border border-white/40 backdrop-blur-3xl shadow-xl rounded-3xl p-5 flex flex-col items-center justify-between text-center min-h-[340px]">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Rest Time
        </p>
        <div className="mt-5 text-rose-500">
          <i
            className={`fa-solid fa-stopwatch text-3xl ${
              isTimerRunning ? "animate-pulse" : ""
            }`}
          ></i>
        </div>
        <p
          className={`mt-5 text-3xl font-black tracking-widest transition-all duration-300 ${
            timeLeft <= 10
              ? "text-red-600 scale-105 animate-pulse"
              : "text-slate-900"
          }`}
        >
          {formatTime(timeLeft)}
        </p>
        <p className="text-[9px] font-bold tracking-wider uppercase mt-1.5 text-slate-400">
          {isTimerRunning ? "Resting..." : "Paused"}
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full mt-4">
        <button
          onClick={toggleTimer}
          className={`w-full py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer text-white ${
            isTimerRunning
              ? "bg-amber-500 hover:bg-amber-600"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {isTimerRunning ? "Pause" : "Start Rest"}
        </button>
        <button
          onClick={resetTimer}
          className="w-full py-2 rounded-xl bg-white/40 border border-white/60 text-slate-700 font-bold text-[10px] tracking-wider uppercase hover:bg-white/50 active:scale-95 transition-all cursor-pointer"
        >
          Reset (1m)
        </button>
      </div>
    </div>
  );
}

export function WorkoutFormList({
  exerciseName,
  setExerciseName,
  weightInput,
  setWeightInput,
  repsInput,
  setRepsInput,
  handleAddWorkout,
  workoutList,
  handleDeleteWorkout,
}) {
  return (
    <div className="h-full bg-white/10 border border-white/40 backdrop-blur-3xl shadow-xl rounded-3xl p-5 sm:p-6 flex flex-col custom-scrollbar">
      <p className="text-sm font-bold tracking-wider text-slate-800 uppercase mb-4">
        Your Workout Logs
      </p>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="bg-white/20 p-4 rounded-2xl border border-white/20">
          <input
            type="text"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            className="bg-white/60 h-10 w-full rounded-xl p-3 text-sm focus:outline-hidden font-medium placeholder:text-slate-400 border border-black/5 text-slate-900"
            placeholder="Exercise name (e.g., Bench Press)"
          />
          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <input
              type="text"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              className="bg-white/60 h-10 sm:w-1/3 rounded-xl p-3 text-sm focus:outline-hidden font-medium border border-black/5 text-slate-900"
              placeholder="Weight (kg)"
            />
            <input
              type="text"
              value={repsInput}
              onChange={(e) => setRepsInput(e.target.value)}
              className="bg-white/60 h-10 sm:w-1/3 rounded-xl p-3 text-sm focus:outline-hidden font-medium border border-black/5 text-slate-900"
              placeholder="Reps"
            />
            <button
              onClick={handleAddWorkout}
              className="sm:w-1/3 h-10 text-xs font-bold tracking-wider uppercase bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Add Log
            </button>
          </div>
        </div>

        {/* DYNAMIC LIST WITH DELETE OPTION */}
        <div className="overflow-y-auto mt-4 pr-1 flex flex-col gap-2 flex-1 custom-scrollbar min-h-[160px]">
          {workoutList.length === 0 ? (
            <p className="text-slate-500 text-xs font-medium italic p-4 text-center bg-white/5 rounded-2xl border border-white/10">
              No exercises logged for today yet.
            </p>
          ) : (
            workoutList.map((workout) => (
              <div
                key={workout.id}
                className="min-h-14 bg-white/40 rounded-xl px-4 py-2 flex items-center justify-between shadow-2xs border border-white/20 shrink-0"
              >
                <div className="pr-2">
                  <p className="font-bold text-sm text-slate-900 uppercase tracking-tight break-words">
                    {workout.name}
                  </p>
                  <p className="text-[11px] text-slate-500 font-semibold">
                    {workout.weight}kg × {workout.reps} Reps
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteWorkout(workout.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors p-2 cursor-pointer shrink-0"
                  aria-label="Delete workout"
                >
                  <i className="fa-solid fa-trash-can text-sm"></i>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function WorkoutView({
  exerciseName,
  setExerciseName,
  weightInput,
  setWeightInput,
  repsInput,
  setRepsInput,
  handleAddWorkout,
  workoutList,
  handleDeleteWorkout,
  timeLeft,
  setTimeLeft,
  isTimerRunning,
  setIsTimerRunning,
}) {
  return (
    <div className="animate-in fade-in duration-300 slide-in-from-bottom-2 flex flex-col gap-6">
      <h1 className="text-2xl font-black tracking-wider text-slate-900 uppercase">
        Your Daily Routine
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2 min-h-[400px]">
          <WorkoutFormList
            exerciseName={exerciseName}
            setExerciseName={setExerciseName}
            weightInput={weightInput}
            setWeightInput={setWeightInput}
            repsInput={repsInput}
            setRepsInput={setRepsInput}
            handleAddWorkout={handleAddWorkout}
            workoutList={workoutList}
            handleDeleteWorkout={handleDeleteWorkout}
          />
        </div>

        <div className="lg:col-span-1 min-h-[400px]">
          <RestTimer
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
          />
        </div>
      </div>
    </div>
  );
}
