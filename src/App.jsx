import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  // AVAILABLE TABS: "dashboard", "workout", "logger", "settings"
  const [activeTab, setActiveTab] = useState("dashboard");

  // 💾 LOCAL STORAGE SE INITIAL DATA LOAD KARNA
  const [profileName, setProfileName] = useState(() => {
    return localStorage.getItem("flex_profileName") || "User";
  });

  const [currentCalorie, setCalorie] = useState(() => {
    return Number(localStorage.getItem("flex_currentCalorie")) || 0;
  });
  const [targetCalorie, setTargetCalorie] = useState(() => {
    return Number(localStorage.getItem("flex_targetCalorie")) || 3000;
  });

  const [currentProtein, setProtein] = useState(() => {
    return Number(localStorage.getItem("flex_currentProtein")) || 0;
  });
  const [targetProtein, setTargetProtein] = useState(() => {
    return Number(localStorage.getItem("flex_targetProtein")) || 150;
  });

  const [waterGlasses, setWaterGlasses] = useState(() => {
    return Number(localStorage.getItem("flex_waterGlasses")) || 0;
  });
  const targetWaterGlasses = 8;

  const [workoutList, setWorkoutList] = useState(() => {
    const savedWorkouts = localStorage.getItem("flex_workoutList");
    return savedWorkouts ? JSON.parse(savedWorkouts) : [];
  });

  // REST TIMER STATES
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Manual custom inputs ki states
  const [manualCal, setManualCal] = useState("");
  const [manualProt, setManualProt] = useState("");

  // Settings temporary states
  const [tempName, setTempName] = useState(profileName);
  const [tempCalorie, setTempCalorie] = useState(targetCalorie);
  const [tempProtein, setTempProtein] = useState(targetProtein);

  const [editMode, setEditMode] = useState({
    name: false,
    calorie: false,
    protein: false,
  });

  // 💾 EFFECT: DATA KO LOCAL STORAGE MEIN SAVE KARNA
  useEffect(() => {
    localStorage.setItem("flex_profileName", profileName);
    localStorage.setItem("flex_targetCalorie", targetCalorie.toString());
    localStorage.setItem("flex_targetProtein", targetProtein.toString());
  }, [profileName, targetCalorie, targetProtein]);

  useEffect(() => {
    localStorage.setItem("flex_currentCalorie", currentCalorie.toString());
    localStorage.setItem("flex_currentProtein", currentProtein.toString());
  }, [currentCalorie, currentProtein]);

  useEffect(() => {
    localStorage.setItem("flex_waterGlasses", waterGlasses.toString());
  }, [waterGlasses]);

  useEffect(() => {
    localStorage.setItem("flex_workoutList", JSON.stringify(workoutList));
  }, [workoutList]);

  // TIMER CONTROL LOGIC
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const caloriePercentage = Math.min(
    (currentCalorie / targetCalorie) * 100,
    100,
  );
  const proteinPercentage = Math.min(
    (currentProtein / targetProtein) * 100,
    100,
  );

  // DYNAMIC GLOWS ACCORDING TO TABS
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
    if (activeTab == "logger") {
      return {
        glow1: "from-orange-400/40 to-amber-400/20",
        glow2: "from-sky-400/30 to-cyan-500/20",
        glow3: "from-yellow-300/20 to-red-500/20",
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

  const handleDeleteWorkout = (id) => {
    setWorkoutList(workoutList.filter((item) => item.id !== id));
  };

  // WATER ACTIONS
  const addWaterGlass = () => setWaterGlasses((prev) => prev + 1);
  const removeWaterGlass = () =>
    setWaterGlasses((prev) => Math.max(0, prev - 1));

  // 🥩 MACROS ACTIONS
  const handleQuickLog = (cal, prot) => {
    setCalorie((prev) => prev + cal);
    setProtein((prev) => prev + prot);
  };

  const handleManualLog = (action) => {
    const calValue = Number(manualCal) || 0;
    const protValue = Number(manualProt) || 0;

    if (action === "add") {
      setCalorie((prev) => prev + calValue);
      setProtein((prev) => prev + protValue);
    } else if (action === "subtract") {
      setCalorie((prev) => Math.max(0, prev - calValue));
      setProtein((prev) => Math.max(0, prev - protValue));
    }

    setManualCal("");
    setManualProt("");
  };

  const handleResetIntake = () => {
    setCalorie(0);
    setProtein(0);
  };

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
      <div className="bg-slate-200/80 min-h-screen relative pt-5 pb-5 pl-3 flex overflow-hidden font-sans costum-scrollbar">
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
          <div className="mt-6">
            <div className="flex items-center gap-3 pl-3 mb-8">
              <div className="bg-slate-900 h-4 w-4 rounded-full animate-pulse duration-1000"></div>
              <p className="text-slate-900 font-extrabold text-2xl tracking-tight">
                Flextracker
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div
                onClick={() => setActiveTab("dashboard")}
                className={`text-sm font-semibold p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all duration-300 tracking-wide ${
                  activeTab === "dashboard"
                    ? "bg-white border-white text-slate-900 shadow-xs"
                    : "bg-white/10 border-white/20 text-slate-700 hover:bg-white/30"
                }`}
              >
                <i className="fa-solid fa-house text-xs"></i> Dashboard
              </div>

              <div
                onClick={() => setActiveTab("workout")}
                className={`text-sm font-semibold p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all duration-300 tracking-wide ${
                  activeTab === "workout"
                    ? "bg-white border-white text-slate-900 shadow-xs"
                    : "bg-white/10 border-white/20 text-slate-700 hover:bg-white/30"
                }`}
              >
                <i className="fa-solid fa-dumbbell text-xs"></i> Workout log
              </div>

              {/* 🟢 NEW SIDEBAR LOGGER TAB */}
              <div
                onClick={() => setActiveTab("logger")}
                className={`text-sm font-semibold p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all duration-300 tracking-wide ${
                  activeTab === "logger"
                    ? "bg-white border-white text-slate-900 shadow-xs"
                    : "bg-white/10 border-white/20 text-slate-700 hover:bg-white/30"
                }`}
              >
                <i className="fa-solid fa-utensils text-xs"></i> Macro Logger
              </div>

              <div
                onClick={() => {
                  setActiveTab("settings");
                  setTempName(profileName);
                  setTempCalorie(targetCalorie);
                  setTempProtein(targetProtein);
                }}
                className={`text-sm font-semibold p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all duration-300 tracking-wide ${
                  activeTab === "settings"
                    ? "bg-white border-white text-slate-900 shadow-xs"
                    : "bg-white/10 border-white/20 text-slate-700 hover:bg-white/30"
                }`}
              >
                <i className="fa-solid fa-gear text-xs"></i> Settings
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTAINER */}
        <main className="flex-1 overflow-y-auto z-10 p-8 overflow-x-hidden no-scrollbar">
          {/* 🟢 DASHBOARD VIEW */}
          {activeTab == "dashboard" && (
            <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
              <h1 className="text-2xl font-black tracking-wider text-slate-900 uppercase mb-2">
                WELCOME BACK, {profileName}!
              </h1>

              <div className="flex gap-6 mt-6">
                {/* Calories Card */}
                <div className="p-5 h-36 w-80 bg-white/10 rounded-3xl border border-white/40 shadow-xl backdrop-blur-3xl flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-fire text-orange-500 text-sm"></i>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Today's Calories
                    </p>
                  </div>
                  <p className="text-xl font-bold tracking-tight text-slate-900">
                    {currentCalorie}{" "}
                    <span className="text-xs font-medium text-slate-500">
                      / {targetCalorie} kcal
                    </span>
                  </p>
                  <div className="w-full h-2.5 bg-black/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-orange-400 to-amber-500 transition-all duration-500 ease-out"
                      style={{ width: `${caloriePercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Protein Card */}
                <div className="p-5 h-36 w-80 bg-white/10 rounded-3xl border border-white/40 shadow-xl backdrop-blur-3xl flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-shrimp text-sky-500 text-sm"></i>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Today's Protein
                    </p>
                  </div>
                  <p className="text-xl font-bold tracking-tight text-slate-900">
                    {currentProtein}g{" "}
                    <span className="text-xs font-medium text-slate-500">
                      / {targetProtein}g
                    </span>
                  </p>
                  <div className="w-full h-2.5 bg-black/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-sky-400 to-indigo-500 transition-all duration-500 ease-out"
                      style={{ width: `${proteinPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Weight Card */}
                <div className="p-5 h-36 w-40 bg-white/10 rounded-3xl border border-white/40 shadow-xl backdrop-blur-3xl flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Weight
                    </p>
                    <p className="text-2xl font-black tracking-tight text-slate-900">
                      65
                      <span className="text-xs font-bold text-slate-500">
                        {" "}
                        kg
                      </span>
                    </p>
                  </div>
                  <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-md w-max">
                    Target: 70kg
                  </p>
                </div>
              </div>

              <div className="flex items-center mt-6">
                <div className="h-80 w-172 pr-5 flex">
                  <div className="h-full w-full bg-white/10 border border-white/40 backdrop-blur-3xl shadow-xl rounded-3xl p-6 flex flex-col costum-scrollbar">
                    <p className="text-sm font-bold tracking-wider text-slate-800 uppercase mb-4">
                      Today's GOALS
                    </p>

                    <div className="flex-1 overflow-y-auto pr-2 min-h-0 costum-scrollbar flex flex-col gap-3">
                      {workoutList.length === 0 ? (
                        <p className="text-slate-500 text-xs font-medium italic p-4 text-center bg-white/5 rounded-2xl border border-white/10">
                          No logs added ,Please add a log in workout tab
                        </p>
                      ) : (
                        workoutList.map((workout) => (
                          <div
                            key={workout.id}
                            className="w-full h-16 bg-white/40 shadow-xs border border-white/20 rounded-2xl px-4 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300 shrink-0"
                          >
                            <div>
                              <p className="font-bold text-sm text-slate-900 uppercase tracking-tight">
                                {workout.name}
                              </p>
                              <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                                Target: {workout.weight}kg × {workout.reps} Reps
                              </p>
                            </div>
                            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                              Active
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* WATER INTAKE TRACKER */}
                <div className="h-80 w-40 bg-white/10 border border-white/40 backdrop-blur-3xl shadow-xl rounded-3xl p-5 flex flex-col items-center justify-between text-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Water Intake
                    </p>
                    <div className="mt-4 text-sky-500 animate-bounce duration-1000">
                      <i className="fa-solid fa-droplet text-3xl"></i>
                    </div>
                    <p className="mt-4 text-2xl font-black text-slate-900 tracking-tight">
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

                  <div className="flex gap-2.5 w-full justify-center">
                    <button
                      onClick={removeWaterGlass}
                      className="w-9 h-9 rounded-xl bg-white/40 border border-white/60 text-slate-700 font-bold hover:bg-white/70 transition-all shadow-2xs active:scale-95 text-sm"
                    >
                      -
                    </button>
                    <button
                      onClick={addWaterGlass}
                      className="w-12 h-9 rounded-xl bg-sky-500 border border-sky-400 text-white font-bold hover:bg-sky-600 transition-all shadow-md active:scale-95 text-sm"
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
              <h1 className="text-2xl font-black tracking-wider text-slate-900 uppercase">
                Your Daily Routine
              </h1>

              <div className="flex items-center mt-6">
                <div className="h-100 w-178 pr-5 flex">
                  <div className="h-full w-full bg-white/10 border border-white/40 backdrop-blur-3xl shadow-xl rounded-3xl p-6 flex flex-col custom-scrollbar">
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
                        <div className="flex gap-3 mt-3">
                          <input
                            type="text"
                            value={weightInput}
                            onChange={(e) => setWeightInput(e.target.value)}
                            className="bg-white/60 h-10 w-1/3 rounded-xl p-3 text-sm focus:outline-hidden font-medium border border-black/5 text-slate-900"
                            placeholder="Weight (kg)"
                          />
                          <input
                            type="text"
                            value={repsInput}
                            onChange={(e) => setRepsInput(e.target.value)}
                            className="bg-white/60 h-10 w-1/3 rounded-xl p-3 text-sm focus:outline-hidden font-medium border border-black/5 text-slate-900"
                            placeholder="Reps"
                          />
                          <button
                            onClick={handleAddWorkout}
                            className="w-1/3 h-10 text-xs font-bold tracking-wider uppercase bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-95"
                          >
                            Add Log
                          </button>
                        </div>
                      </div>

                      {/* DYNAMIC LIST WITH DELETE OPTION */}
                      <div className="overflow-y-auto mt-4 pr-1 flex flex-col gap-2 flex-1 costum-scrollbar">
                        {workoutList.length === 0 ? (
                          <p className="text-slate-500 text-xs font-medium italic p-4 text-center bg-white/5 rounded-2xl border border-white/10">
                            No exercises logged for today yet.
                          </p>
                        ) : (
                          workoutList.map((workout) => (
                            <div
                              key={workout.id}
                              className="h-14 bg-white/40 rounded-xl px-4 flex items-center justify-between shadow-2xs border border-white/20 shrink-0"
                            >
                              <div>
                                <p className="font-bold text-sm text-slate-900 uppercase tracking-tight">
                                  {workout.name}
                                </p>
                                <p className="text-[11px] text-slate-500 font-semibold">
                                  {workout.weight}kg × {workout.reps} Reps
                                </p>
                              </div>
                              <button
                                onClick={() => handleDeleteWorkout(workout.id)}
                                className="text-slate-400 hover:text-red-500 transition-colors p-2 cursor-pointer"
                              >
                                <i className="fa-solid fa-trash-can text-sm"></i>
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* REST TIMER CARD */}
                <div className="h-100 w-40 bg-white/10 border border-white/40 backdrop-blur-3xl shadow-xl rounded-3xl p-5 flex flex-col items-center justify-between text-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Rest Time
                    </p>
                    <div className="mt-5 text-rose-500">
                      <i
                        className={`fa-solid fa-stopwatch text-3xl ${isTimerRunning ? "animate-pulse" : ""}`}
                      ></i>
                    </div>
                    <p
                      className={`mt-5 text-3xl font-black tracking-widest transition-all duration-300 ${timeLeft <= 10 ? "text-red-600 scale-105 animate-pulse" : "text-slate-900"}`}
                    >
                      {formatTime(timeLeft)}
                    </p>
                    <p className="text-[9px] font-bold tracking-wider uppercase mt-1.5 text-slate-400">
                      {isTimerRunning ? "Resting..." : "Paused"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <button
                      onClick={toggleTimer}
                      className={`w-full h-9 rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 text-white ${isTimerRunning ? "bg-amber-500 hover:bg-amber-600" : "bg-emerald-600 hover:bg-emerald-700"}`}
                    >
                      {isTimerRunning ? "Pause" : "Start Rest"}
                    </button>
                    <button
                      onClick={resetTimer}
                      className="w-full h-8 rounded-xl bg-white/40 border border-white/60 text-slate-700 font-bold text-[10px] tracking-wider uppercase hover:bg-white/50 active:scale-95 transition-all"
                    >
                      Reset (1m)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 🍳 NEW MACRO LOGGER VIEW (Fully isolated page) */}
          {activeTab == "logger" && (
            <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
              <div className="flex justify-between items-center w-178 mb-6">
                <div>
                  <h1 className="text-2xl font-black tracking-wider text-slate-900 uppercase">
                    Nutrition Tracker
                  </h1>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    Manage your daily caloric and protein intake
                  </p>
                </div>
                <button
                  onClick={handleResetIntake}
                  className="text-[10px] font-bold tracking-wider uppercase bg-white/40 border border-white/60 text-slate-700 px-3 py-1.5 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-2xs active:scale-95"
                >
                  Reset Intake (0)
                </button>
              </div>

              <div className="flex flex-col gap-4 w-178">
                {/* Current Status Mini-Card */}
                <div className="p-4 bg-white/30 border border-white/50 rounded-2xl backdrop-blur-3xl flex justify-around text-center shadow-xs">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                      Current Calories
                    </p>
                    <p className="text-lg font-extrabold text-slate-900 mt-0.5">
                      {currentCalorie} / {targetCalorie} kcal
                    </p>
                  </div>
                  <div className="w-px bg-black/10 h-8 self-center"></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                      Current Protein
                    </p>
                    <p className="text-lg font-extrabold text-slate-900 mt-0.5">
                      {currentProtein}g / {targetProtein}g
                    </p>
                  </div>
                </div>

                {/* 1. Quick Presets Box */}
                <div className="p-5 bg-white/10 border border-white/40 backdrop-blur-3xl rounded-3xl shadow-xl">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3.5">
                    Quick Food Presets
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={() => handleQuickLog(70, 6)}
                      className="bg-white/60 border border-white hover:bg-white text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-2xs active:scale-95 flex items-center gap-2"
                    >
                      <span>Egg (Whole)</span>{" "}
                      <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded-md text-slate-600">
                        +6g P
                      </span>
                    </button>
                    <button
                      onClick={() => handleQuickLog(165, 30)}
                      className="bg-white/60 border border-white hover:bg-white text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-2xs active:scale-95 flex items-center gap-2"
                    >
                      <span>Chicken Breast 100g</span>{" "}
                      <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded-md text-slate-600">
                        +30g P
                      </span>
                    </button>
                    <button
                      onClick={() => handleQuickLog(200, 25)}
                      className="bg-white/60 border border-white hover:bg-white text-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-2xs active:scale-95 flex items-center gap-2"
                    >
                      <span>Protein Shake</span>{" "}
                      <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded-md text-slate-600">
                        +25g P
                      </span>
                    </button>
                  </div>
                </div>

                {/* 2. Detailed Custom Form */}
                <div className="p-5 bg-white/10 border border-white/40 backdrop-blur-3xl rounded-3xl shadow-xl flex flex-col gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Detailed Custom Log
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                      Manually add or subtract precise nutrient metrics
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-white/50 border border-black/5 rounded-xl px-3 py-2 w-1/2">
                      <i className="fa-solid fa-fire text-orange-500 text-sm mr-2.5"></i>
                      <input
                        type="number"
                        value={manualCal}
                        onChange={(e) => setManualCal(e.target.value)}
                        placeholder="Calories (kcal)"
                        className="w-full bg-transparent text-xs font-bold focus:outline-hidden text-slate-800 placeholder:text-slate-400"
                      />
                    </div>

                    <div className="flex items-center bg-white/50 border border-black/5 rounded-xl px-3 py-2 w-1/2">
                      <i className="fa-solid fa-shrimp text-sky-500 text-sm mr-2.5"></i>
                      <input
                        type="number"
                        value={manualProt}
                        onChange={(e) => setManualProt(e.target.value)}
                        placeholder="Protein (grams)"
                        className="w-full bg-transparent text-xs font-bold focus:outline-hidden text-slate-800 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end mt-1">
                    <button
                      onClick={() => handleManualLog("subtract")}
                      className="bg-white/40 border border-white/60 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-2xs active:scale-95 flex items-center gap-2"
                    >
                      <i className="fa-solid fa-minus text-[10px]"></i> Subtract
                    </button>
                    <button
                      onClick={() => handleManualLog("add")}
                      className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold px-6 py-2 rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-wider flex items-center gap-2"
                    >
                      <i className="fa-solid fa-plus text-[10px]"></i> Add Log
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ⚙️ SETTINGS VIEW */}
          {activeTab === "settings" && (
            <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
              <h1 className="text-2xl font-black tracking-wider text-slate-900 uppercase mb-6">
                SETTINGS
              </h1>
              <div className="p-6 w-178 bg-white/10 border border-white/40 backdrop-blur-3xl shadow-xl rounded-3xl">
                <p className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">
                  Configurations
                </p>
                <div className="flex flex-col gap-3">
                  {/* Name Edit */}
                  <div className="w-full min-h-14 bg-white/20 rounded-2xl p-4 border border-white/15 flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-slate-700">
                      Profile Name:
                    </span>
                    {editMode.name ? (
                      <div className="flex items-center gap-2 w-full justify-end">
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          className="bg-white/70 px-3 py-1 rounded-xl border border-black/5 focus:outline-hidden text-sm w-48 text-right font-medium"
                        />
                        <button
                          onClick={handleSaveName}
                          className="bg-emerald-600 text-white px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-600 font-semibold italic">
                          {profileName}
                        </span>
                        <button
                          onClick={() =>
                            setEditMode({ ...editMode, name: true })
                          }
                          className="bg-white/40 border border-white/60 px-3 py-1 rounded-xl text-xs font-bold text-slate-700 hover:bg-white/60"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Calorie Edit */}
                  <div className="w-full min-h-14 bg-white/20 rounded-2xl p-4 border border-white/15 flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-slate-700">
                      Daily Calorie Goal:
                    </span>
                    {editMode.calorie ? (
                      <div className="flex items-center gap-2 w-full justify-end">
                        <input
                          type="number"
                          value={tempCalorie}
                          onChange={(e) => setTempCalorie(e.target.value)}
                          className="bg-white/70 px-3 py-1 rounded-xl border border-black/5 focus:outline-hidden text-sm w-32 text-right font-medium"
                        />
                        <button
                          onClick={handleSaveCalorie}
                          className="bg-emerald-600 text-white px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-600 font-semibold italic">
                          {targetCalorie} kcal
                        </span>
                        <button
                          onClick={() =>
                            setEditMode({ ...editMode, calorie: true })
                          }
                          className="bg-white/40 border border-white/60 px-3 py-1 rounded-xl text-xs font-bold text-slate-700 hover:bg-white/60"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Protein Edit */}
                  <div className="w-full min-h-14 bg-white/20 rounded-2xl p-4 border border-white/15 flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-slate-700">
                      Daily Protein Goal:
                    </span>
                    {editMode.protein ? (
                      <div className="flex items-center gap-2 w-full justify-end">
                        <input
                          type="number"
                          value={tempProtein}
                          onChange={(e) => setTempProtein(e.target.value)}
                          className="bg-white/70 px-3 py-1 rounded-xl border border-black/5 focus:outline-hidden text-sm w-32 text-right font-medium"
                        />
                        <button
                          onClick={handleSaveProtein}
                          className="bg-emerald-600 text-white px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-600 font-semibold italic">
                          {targetProtein}g
                        </span>
                        <button
                          onClick={() =>
                            setEditMode({ ...editMode, protein: true })
                          }
                          className="bg-white/40 border border-white/60 px-3 py-1 rounded-xl text-xs font-bold text-slate-700 hover:bg-white/60"
                        >
                          Edit
                        </button>
                      </div>
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
