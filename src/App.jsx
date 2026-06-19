import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // DYNAMIC PROFILE STATES
  const [profileName, setProfileName] = useState("Ashaan");
  const [currentCalorie, setCalorie] = useState(2000);
  const [targetCalorie, setTargetCalorie] = useState(3000);

  const [currentProtein, setProtein] = useState(140);
  const [targetProtein, setTargetProtein] = useState(150);

  // 💥 WATER INTAKE STATE
  const [waterGlasses, setWaterGlasses] = useState(3);
  const targetWaterGlasses = 8; // Daily target 8 glasses

  // ⏱️ REST TIMER STATES (Nayi states rest timer ke liye)
  const [timeLeft, setTimeLeft] = useState(60); // Default 60 seconds (1 minute) rest
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Settings temporary states
  const [tempName, setTempName] = useState(profileName);
  const [tempCalorie, setTempCalorie] = useState(targetCalorie);
  const [tempProtein, setTempProtein] = useState(targetProtein);

  const [editMode, setEditMode] = useState({
    name: false,
    calorie: false,
    protein: false,
  });

  const caloriePercentage = Math.min(
    (currentCalorie / targetCalorie) * 100,
    100,
  );
  const proteinPercentage = Math.min(
    (currentProtein / targetProtein) * 100,
    100,
  );

  // ⏱️ TIMER CONTROL LOGIC
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval); // Cleanup memory leak se bachne ke liye
  }, [isTimerRunning, timeLeft]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(60); // Reset back to 1 minute
  };

  // Plain number ko clock style rendering (MM:SS) dainay ka helper function
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getGLowClasses = () => {
    if (activeTab == "dashboard") {
      return {
        glow1: "from-lime-400/40 to-emerald-400/20",
        glow2: "from-sky-400/40 to-indigo-400/20",
        glow3: "from-orange-300/30 to-red-400/30",
      };
    }
    if (activeTab == "workout") {
      return {
        glow1: "from-red-500/40 to-orange-500/20",
        glow2: "from-amber-500/30 to-yellow-400/20",
        glow3: "from-rose-500/30 to-purple-600/20",
      };
    }
    if (activeTab == "settings") {
      return {
        glow1: "from-purple-500/30 to-indigo-500/20",
        glow2: "from-slate-400/30 to-zinc-500/20",
        glow3: "from-cyan-500/20 to-blue-500/20",
      };
    }
    return { glow1: "", glow2: "", glow3: "" };
  };

  const glows = getGLowClasses();

  const [workoutList, setWorkoutList] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [repsInput, setRepsInput] = useState("");

  const handleAddWorkout = () => {
    if (!exerciseName.trim()) return;

    const newWorkout = {
      id: Date.now(),
      name: exerciseName,
      weight: weightInput || "0",
      reps: repsInput || "0",
    };

    setWorkoutList([...workoutList, newWorkout]);
    setExerciseName("");
    setWeightInput("");
    setRepsInput("");
  };

  // WATER ACTIONS
  const addWaterGlass = () => {
    setWaterGlasses((prev) => prev + 1);
  };

  const removeWaterGlass = () => {
    setWaterGlasses((prev) => Math.max(0, prev - 1));
  };

  // SAVE FUNCTIONS FOR SETTINGS
  const handleSaveName = () => {
    if (tempName.trim()) setProfileName(tempName);
    setEditMode({ ...editMode, name: false });
  };

  const handleSaveCalorie = () => {
    if (Number(tempCalorie) > 0) setTargetCalorie(Number(tempCalorie));
    setEditMode({ ...editMode, calorie: false });
  };

  const handleSaveProtein = () => {
    if (Number(tempProtein) > 0) setTargetProtein(Number(tempProtein));
    setEditMode({ ...editMode, protein: false });
  };

  return (
    <>
      <div className="bg-slate-200/80 min-h-screen relative pt-5 pb-5 pl-3 flex overflow-hidden costum-scrollbar">
        {/* Background Glows */}
        <div className="w-full h-full absolute top-0 left-0 z-0">
          <div
            className={`absolute top-[-20%] left-[-20%] w-150 h-150 rounded-full bg-linear-to-br ${glows.glow1} blur-3xl pointer-events-none z-0 transition-all duration-700 ease-in-out`}
          ></div>
          <div
            className={`absolute bottom-[-20%] right-[-10%] w-175 h-175 rounded-full bg-linear-to-tr ${glows.glow2} blur-3xl pointer-events-none z-0 transition-all duration-700 ease-in-out`}
          ></div>
          <div
            className={`bg-linear-to-br ${glows.glow3} w-150 rounded-full absolute bottom-[-5%] right-[-5%] z-0 blur-3xl pointer-events-none transition-all duration-700 ease-in-out`}
          ></div>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col z-10 bg-white/5 border relative border-white/40 backdrop-blur-3xl w-60 h-[calc(100vh-40px)] rounded-3xl pr-2 pl-2 shadow-2xl no-scrollbar">
          <div>
            <div className="mt-5">
              <div className="flex items-center gap-3 pl-2">
                <div className="bg-black h-5 w-5 rounded-full animate-pulse duration-1000"></div>
                <p className="text-black font-extrabold text-3xl">
                  Flextracker
                </p>
              </div>
              <div
                onClick={() => {
                  setActiveTab("dashboard");
                  setTempName(profileName);
                  setTempCalorie(targetCalorie);
                  setTempProtein(targetProtein);
                }}
                className={`hover:bg-white text-black font-bold text-xl p-3 rounded-2xl border mt-5 flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                  activeTab === "dashboard"
                    ? "bg-white border-white"
                    : "bg-white/20 border-white/30"
                }`}
              >
                <i className="fa-solid fa-house"></i>
                Dashboard
              </div>
              <div
                onClick={() => setActiveTab("workout")}
                className={`text-black font-bold text-xl p-3 rounded-2xl border mt-5 flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                  activeTab === "workout"
                    ? "bg-white border-white"
                    : "bg-white/20 border-white/30"
                }`}
              >
                <i className="fa-solid fa-dumbbell"></i>
                Workout log
              </div>
              <div
                onClick={() => setActiveTab("settings")}
                className={`text-black font-bold text-xl p-3 rounded-2xl border mt-5 flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                  activeTab === "settings"
                    ? "bg-white border-white"
                    : "bg-white/20 border-white/30"
                }`}
              >
                <i className="fa-solid fa-gear"></i>
                Settings
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTAINER */}
        <main className="flex-1 overflow-y-auto z-10 p-8 overflow-x-hidden no-scrollbar">
          {/* 🟢 DASHBOARD VIEW */}
          {activeTab == "dashboard" && (
            <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
              <h1 className="text-3xl font-extrabold tracking-tight uppercase">
                WELCOME BACK, {profileName}!
              </h1>
              <div className="flex gap-10">
                {/* Calories Card */}
                <div className="p-3 h-35 w-80 bg-white/5 rounded-3xl border border-white/40 shadow-2xl backdrop-blur-3xl mt-5">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-fire text-orange-500"></i>
                    <p className="text-xl font-bold">Todays Calories</p>
                  </div>
                  <p className="mt-3 text-xl font-semibold tracking-tight">
                    {currentCalorie}/{targetCalorie} kcal
                  </p>
                  <div className="mt-3 w-70 h-3.5 bg-black/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-lime-500/50 to-emerald-600 transition-all duration-500 ease-out"
                      style={{ width: `${caloriePercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Protein Card */}
                <div className="p-3 h-35 w-80 bg-white/5 rounded-3xl border border-white/40 shadow-2xl backdrop-blur-3xl mt-5">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-shrimp text-sky-500"></i>
                    <p className="text-xl font-bold">Todays Protein</p>
                  </div>
                  <p className="mt-3 text-xl font-semibold tracking-tight">
                    {currentProtein}g/{targetProtein}g
                  </p>
                  <div className="mt-3 w-70 h-3.5 bg-black/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-blue-700/50 to-sky-800/45 transition-all duration-500 ease-out"
                      style={{ width: `${proteinPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Weight Card */}
                <div className="p-3 h-35 w-40 bg-white/5 rounded-3xl border border-white/40 shadow-2xl backdrop-blur-3xl mt-5">
                  <div>
                    <p className="text-xl font-bold">Weight</p>
                    <p className="text-xl font-semibold">65kg</p>
                    <p className="text-blue-500/60 font-bold text-xs mt-3">
                      Target: 70kg
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="h-80 w-178 pr-7 mt-5 flex">
                  <div className="h-full w-full bg-white/5 border border-white/40 backdrop-blur-3xl shadow-2xl rounded-3xl p-5 flex flex-col costum-scrollbar">
                    <p className="text-xl font-bold tracking-tight mb-2">
                      Todays GOALS
                    </p>

                    <div className="flex-1 overflow-y-auto pr-2 min-h-0 costum-scrollbar flex flex-col gap-3">
                      {workoutList.length === 0 ? (
                        <p className="text-slate-500 text-sm italic p-3">
                          Aaj ka koi goal nahi hai, workout log mein add karein!
                        </p>
                      ) : (
                        workoutList.map((workout) => (
                          <div
                            key={workout.id}
                            className="w-full h-20 bg-white/45 shadow-lg border border-white/20 rounded-2xl p-4 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300 shrink-0"
                          >
                            <div>
                              <p className="font-bold text-base text-black uppercase tracking-tight">
                                {workout.name}
                              </p>
                              <p className="text-xs text-slate-600 font-semibold mt-1">
                                Target: {workout.weight}kg × {workout.reps} Reps
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-lg">
                                Active
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* CHOTA VALA DIV: WATER INTAKE TRACKER */}
                <div className="h-80 w-40 bg-white/5 border border-white/40 backdrop-blur-3xl shadow-2xl rounded-3xl mt-5 ml-2 p-4 flex flex-col items-center justify-between">
                  <div className="text-center w-full">
                    <p className="text-lg font-bold tracking-tight text-black">
                      Water Intake
                    </p>
                    <div className="mt-4 text-sky-500 animate-bounce duration-1000">
                      <i className="fa-solid fa-droplet text-4xl"></i>
                    </div>
                    <p className="mt-4 text-2xl font-extrabold text-slate-900">
                      {waterGlasses}{" "}
                      <span className="text-xs font-semibold text-slate-500">
                        / {targetWaterGlasses}
                      </span>
                    </p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                      Glasses Drunk
                    </p>
                    <p className="text-[11px] font-medium text-sky-600/80 mt-1">
                      ~{(waterGlasses * 0.25).toFixed(2)} Liters
                    </p>
                  </div>

                  {/* Plus/Minus Interactive Buttons */}
                  <div className="flex gap-3 w-full justify-center mb-2">
                    <button
                      onClick={removeWaterGlass}
                      className="w-10 h-10 rounded-xl bg-white/30 border border-white/50 text-slate-700 font-bold text-lg flex items-center justify-center hover:bg-white/60 transition-all shadow-xs active:scale-95"
                    >
                      -
                    </button>
                    <button
                      onClick={addWaterGlass}
                      className="w-12 h-10 rounded-xl bg-sky-500/80 border border-sky-400 text-white font-bold text-lg flex items-center justify-center hover:bg-sky-500 transition-all shadow-md active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 🔵 WORKOUT VIEW */}
          {activeTab == "workout" && (
            <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
              <div>
                <h1 className="text-black text-2xl tracking-tight font-extrabold">
                  Your daily goals
                </h1>
              </div>
              <div className="flex items-center">
                <div className="h-100 w-178 pr-7 mt-5 flex">
                  <div className="h-full w-full bg-white/5 border border-white/40 backdrop-blur-3xl shadow-2xl rounded-3xl p-5 flex flex-col custom-scrollbar">
                    <p className="text-xl font-bold tracking-tight mb-2">
                      Your workout logs
                    </p>
                    <div className="overflow-y-auto no-scrollbar">
                      <div>
                        <input
                          type="text"
                          value={exerciseName}
                          onChange={(e) => setExerciseName(e.target.value)}
                          className="bg-white/45 h-12 w-134 rounded-2xl p-3"
                          placeholder="Add workout logs here"
                        />
                        <div className="flex gap-4 mt-5">
                          <input
                            type="text"
                            value={weightInput}
                            onChange={(e) => setWeightInput(e.target.value)}
                            className="bg-white/45 h-12 w-30 rounded-2xl p-3"
                            placeholder="Weight"
                          />
                          <input
                            type="text"
                            value={repsInput}
                            onChange={(e) => setRepsInput(e.target.value)}
                            className="bg-white/45 h-12 w-30 rounded-2xl p-3"
                            placeholder="Reps"
                          />
                          <div
                            onClick={handleAddWorkout}
                            className="flex items-center justify-center text-slate-600 h-12 w-30 rounded-2xl bg-white/45 cursor-pointer hover:bg-white/60 transition-all"
                          >
                            <p>Add..</p>
                          </div>
                        </div>
                      </div>

                      {/* DYNAMIC LIST */}
                      <div className="overflow-y-auto mt-5 flex flex-col gap-4">
                        {workoutList.length === 0 ? (
                          <p className="text-slate-500 text-sm italic p-3">
                            Koi workout add nahi kiya abhi tak...
                          </p>
                        ) : (
                          workoutList.map((workout) => (
                            <div
                              key={workout.id}
                              className="h-20 w-134 bg-white/45 rounded-2xl p-4 flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2 duration-300"
                            >
                              <div>
                                <p className="font-bold text-lg text-black uppercase tracking-tight">
                                  {workout.name}
                                </p>
                                <p className="text-sm text-slate-600 font-semibold">
                                  {workout.weight}kg × {workout.reps} Reps
                                </p>
                              </div>
                              <i className="fa-solid fa-circle-check text-emerald-500 text-xl pr-2"></i>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ⏱️ LIVE REST TIMER CARD (Symmetry box populated) */}
                <div className="h-100 w-40 bg-white/5 border border-white/40 backdrop-blur-3xl shadow-2xl rounded-3xl mt-5 ml-2 p-4 flex flex-col items-center justify-between">
                  <div className="text-center w-full">
                    <p className="text-lg font-bold tracking-tight text-black">
                      Rest Time
                    </p>
                    <div className="mt-6 text-rose-500">
                      <i
                        className={`fa-solid fa-stopwatch text-4xl ${isTimerRunning ? "animate-pulse" : ""}`}
                      ></i>
                    </div>
                    {/* Dynamic pulse effect jab count down 10 seconds se kam ho */}
                    <p
                      className={`mt-6 text-3xl font-extrabold tracking-wider transition-all duration-300 ${timeLeft <= 10 ? "text-red-600 scale-105 animate-pulse" : "text-slate-900"}`}
                    >
                      {formatTime(timeLeft)}
                    </p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-2">
                      {isTimerRunning ? "Resting..." : "Paused"}
                    </p>
                  </div>

                  {/* Timer Controls */}
                  <div className="flex flex-col gap-2 w-full mb-2 px-1">
                    <button
                      onClick={toggleTimer}
                      className={`w-full h-10 rounded-xl font-bold text-sm flex items-center justify-center transition-all shadow-md active:scale-95 text-white ${isTimerRunning ? "bg-amber-500 border border-amber-400 hover:bg-amber-600" : "bg-emerald-600 border border-emerald-500 hover:bg-emerald-700"}`}
                    >
                      {isTimerRunning ? "Pause" : "Start Rest"}
                    </button>
                    <button
                      onClick={resetTimer}
                      className="w-full h-9 rounded-xl bg-white/30 border border-white/50 text-slate-700 font-semibold text-xs flex items-center justify-center hover:bg-white/50 active:scale-95 transition-all"
                    >
                      Reset (1m)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ⚙️ SETTINGS VIEW */}
          {activeTab === "settings" && (
            <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
              <h1 className="text-3xl font-extrabold tracking-tight mb-5">
                SETTINGS
              </h1>
              <div className="p-6 w-178 bg-white/5 border border-white/40 backdrop-blur-3xl shadow-2xl rounded-3xl">
                <p className="text-xl font-bold mb-4">
                  Profile & Target Configurations
                </p>
                <div className="flex flex-col gap-4">
                  {/* Name Edit */}
                  <div className="w-full min-h-14 bg-white/20 rounded-2xl p-4 border border-white/20 flex items-center justify-between gap-4">
                    <span className="font-semibold shrink-0">
                      Profile Name:
                    </span>
                    {editMode.name ? (
                      <div className="flex items-center gap-2 w-full justify-end">
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          className="bg-white/60 px-3 py-1 rounded-xl border border-black/10 focus:outline-hidden text-sm w-48 text-right"
                        />
                        <button
                          onClick={handleSaveName}
                          className="bg-emerald-500 text-white px-3 py-1 rounded-xl text-sm font-bold hover:bg-emerald-600"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-slate-700 font-medium italic">
                          {profileName}
                        </span>
                        <button
                          onClick={() =>
                            setEditMode({ ...editMode, name: true })
                          }
                          className="bg-white/45 px-4 py-1 rounded-xl text-sm font-semibold hover:bg-white/60"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>

                  {/* Calorie Edit */}
                  <div className="w-full min-h-14 bg-white/20 rounded-2xl p-4 border border-white/20 flex items-center justify-between gap-4">
                    <span className="font-semibold shrink-0">
                      Daily Calorie Goal (kcal):
                    </span>
                    {editMode.calorie ? (
                      <div className="flex items-center gap-2 w-full justify-end">
                        <input
                          type="number"
                          value={tempCalorie}
                          onChange={(e) => setTempCalorie(e.target.value)}
                          className="bg-white/60 px-3 py-1 rounded-xl border border-black/10 focus:outline-hidden text-sm w-32 text-right"
                        />
                        <button
                          onClick={handleSaveCalorie}
                          className="bg-emerald-500 text-white px-3 py-1 rounded-xl text-sm font-bold hover:bg-emerald-600"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-slate-700 font-medium italic">
                          {targetCalorie} kcal
                        </span>
                        <button
                          onClick={() =>
                            setEditMode({ ...editMode, calorie: true })
                          }
                          className="bg-white/45 px-4 py-1 rounded-xl text-sm font-semibold hover:bg-white/60"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>

                  {/* Protein Edit */}
                  <div className="w-full min-h-14 bg-white/20 rounded-2xl p-4 border border-white/20 flex items-center justify-between gap-4">
                    <span className="font-semibold shrink-0">
                      Daily Protein Goal (g):
                    </span>
                    {editMode.protein ? (
                      <div className="flex items-center gap-2 w-full justify-end">
                        <input
                          type="number"
                          value={tempProtein}
                          onChange={(e) => setTempProtein(e.target.value)}
                          className="bg-white/60 px-3 py-1 rounded-xl border border-black/10 focus:outline-hidden text-sm w-32 text-right"
                        />
                        <button
                          onClick={handleSaveProtein}
                          className="bg-emerald-500 text-white px-3 py-1 rounded-xl text-sm font-bold hover:bg-emerald-600"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-slate-700 font-medium italic">
                          {targetProtein}g
                        </span>
                        <button
                          onClick={() =>
                            setEditMode({ ...editMode, protein: true })
                          }
                          className="bg-white/45 px-4 py-1 rounded-xl text-sm font-semibold hover:bg-white/60"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
