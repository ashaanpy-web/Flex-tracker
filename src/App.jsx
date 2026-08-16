import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";
import BackgroundGlows from "./components/BackgroundGlows";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardView from "./components/DashboardView";
import WorkoutView from "./components/WorkoutView";
import MacroLoggerView from "./components/MacroLoggerView";
import SettingsView from "./components/SettingsView";

export default function App() {
  // AVAILABLE TABS: "dashboard", "workout", "logger", "settings"
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  // LOCAL STORAGE INITIAL DATA LOAD
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

  // Manual custom inputs states
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

  // Workout form states
  const [exerciseName, setExerciseName] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [repsInput, setRepsInput] = useState("");

  // LOCAL STORAGE EFFECTS
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
    if (isTimerRunning) {
      if (timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      } else {
        // Stop timer when reached 0
        const timerId = setTimeout(() => {
          setIsTimerRunning(false);
        }, 0);
        return () => clearTimeout(timerId);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const caloriePercentage = Math.min(
    (currentCalorie / targetCalorie) * 100,
    100
  );
  const proteinPercentage = Math.min(
    (currentProtein / targetProtein) * 100,
    100
  );

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

  // MACROS ACTIONS
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

  const handleOpenSettings = () => {
    setActiveTab("settings");
    setTempName(profileName);
    setTempCalorie(targetCalorie);
    setTempProtein(targetProtein);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 15, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -15, scale: 0.98 },
  };

  return (
    <div className="bg-[#0f172a] min-h-screen relative p-3 sm:p-5 flex flex-col lg:flex-row gap-4 font-sans no-scrollbar">
      {/* Dynamic Background Glows */}
      <BackgroundGlows activeTab={activeTab} />

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={handleOpenSettings}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 z-10">
        {/* Mobile Header */}
        <Header
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          profileName={profileName}
        />

        <main className="flex-1 p-2 sm:p-4 lg:p-6 overflow-x-hidden no-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <DashboardView
                  profileName={profileName}
                  currentCalorie={currentCalorie}
                  targetCalorie={targetCalorie}
                  currentProtein={currentProtein}
                  targetProtein={targetProtein}
                  caloriePercentage={caloriePercentage}
                  proteinPercentage={proteinPercentage}
                  workoutList={workoutList}
                  waterGlasses={waterGlasses}
                  targetWaterGlasses={targetWaterGlasses}
                  addWaterGlass={addWaterGlass}
                  removeWaterGlass={removeWaterGlass}
                />
              </motion.div>
            )}

            {activeTab === "workout" && (
              <motion.div
                key="workout"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <WorkoutView
                  exerciseName={exerciseName}
                  setExerciseName={setExerciseName}
                  weightInput={weightInput}
                  setWeightInput={setWeightInput}
                  repsInput={repsInput}
                  setRepsInput={setRepsInput}
                  handleAddWorkout={handleAddWorkout}
                  workoutList={workoutList}
                  handleDeleteWorkout={handleDeleteWorkout}
                  timeLeft={timeLeft}
                  setTimeLeft={setTimeLeft}
                  isTimerRunning={isTimerRunning}
                  setIsTimerRunning={setIsTimerRunning}
                />
              </motion.div>
            )}

            {activeTab === "logger" && (
              <motion.div
                key="logger"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <MacroLoggerView
                  currentCalorie={currentCalorie}
                  targetCalorie={targetCalorie}
                  currentProtein={currentProtein}
                  targetProtein={targetProtein}
                  manualCal={manualCal}
                  setManualCal={setManualCal}
                  manualProt={manualProt}
                  setManualProt={setManualProt}
                  handleQuickLog={handleQuickLog}
                  handleManualLog={handleManualLog}
                  handleResetIntake={handleResetIntake}
                />
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <SettingsView
                  profileName={profileName}
                  targetCalorie={targetCalorie}
                  targetProtein={targetProtein}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  tempName={tempName}
                  setTempName={setTempName}
                  tempCalorie={tempCalorie}
                  setTempCalorie={setTempCalorie}
                  tempProtein={tempProtein}
                  setTempProtein={setTempProtein}
                  handleSaveName={handleSaveName}
                  handleSaveCalorie={handleSaveCalorie}
                  handleSaveProtein={handleSaveProtein}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
