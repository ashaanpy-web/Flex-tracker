import { useState } from "react";
import "./index.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [currentCalorie, setCalorie] = useState(2000);
  const targetCalorie = 3000;

  const [currentProtein, setProtein] = useState(140); // Sirf number rakha hai taake math sahi chale
  const targetProtein = 150;

  const caloriePercentage = Math.min(
    (currentCalorie / targetCalorie) * 100,
    100,
  );
  const proteinPercentage = Math.min(
    (currentProtein / targetProtein) * 100,
    100,
  );
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
            <div>
              <div className="flex items-center gap-3">
                <div className="bg-black h-5 w-5 rounded-full animate-pulse duration-1000"></div>
                <p className="text-black font-extrabold text-3xl">
                  Flextracker
                </p>
              </div>
              <div
                onClick={() => setActiveTab("dashboard")}
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
              <h1 className="text-3xl font-extrabold tracking-tight">
                WELCOME BACK, Ashaan!
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
                  {/* Outer Progress bar */}
                  <div className="mt-3 w-70 h-3.5 bg-black/10 rounded-full overflow-hidden">
                    {/* Inner Dynamic math filling */}
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
                  {/* Outer Progress bar */}
                  <div className="mt-3 w-70 h-3.5 bg-black/10 rounded-full overflow-hidden">
                    {/* Inner Dynamic math filling */}
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
                    <div className="flex-1 overflow-y-auto pr-2 min-h-0 costum-scrollbar">
                      <div className="w-full h-20 bg-white/45 shadow-2xl mt-3 border-white/4 rounded-2xl"></div>
                      <div className="w-full h-20 bg-white/45 shadow-2xl mt-3 border-white/4 rounded-2xl"></div>
                      <div className="w-full h-20 bg-white/45 shadow-2xl mt-3 border-white/4 rounded-2xl"></div>
                      <div className="w-full h-20 bg-white/45 shadow-2xl mt-3 border-white/4 rounded-2xl"></div>
                    </div>
                  </div>
                </div>
                <div className="h-80 w-40 bg-white/5 border border-white/40 backdrop-blur-3xl shadow-2xl rounded-3xl mt-5 ml-2"></div>
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
                  <div className="h-full w-full bg-white/5 border border-white/40 backdrop-blur-3xl shadow-2xl rounded-3xl p-5 flex flex-col costum-scrollbar">
                    <p className="text-xl font-bold tracking-tight mb-2">
                      Your workout logs
                    </p>
                    <div className="overflow-y-auto no-scrollbar">
                      <div>
                        <input
                          type="text"
                          className="bg-white/45 h-12 w-134 rounded-2xl p-3"
                          placeholder="Add workout logs here"
                        />
                        <div className="flex gap-4 mt-5">
                          <input
                            type="text"
                            className="bg-white/45 h-12 w-30 rounded-2xl p-3"
                            placeholder="Weight"
                          />
                          <input
                            type="text"
                            className="bg-white/45 h-12 w-30 rounded-2xl p-3"
                            placeholder="Reps"
                          />
                          <div className="flex items-center justify-center text-slate-600 h-12 w-30 rounded-2xl bg-white/45 cursor-pointer hover:bg-white/60 transition-all">
                            <p>Add..</p>
                          </div>
                        </div>
                      </div>
                      <div className="overflow-y-auto">
                        <div className="h-20 w-134 bg-white/45 rounded-2xl mt-5"></div>
                        <div className="h-20 w-134 bg-white/45 rounded-2xl mt-5"></div>
                        <div className="h-20 w-134 bg-white/45 rounded-2xl mt-5"></div>
                        <div className="h-20 w-134 bg-white/45 rounded-2xl mt-5"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-80 w-40 bg-white/5 border border-white/40 backdrop-blur-3xl shadow-2xl rounded-3xl mt-5 ml-2"></div>
              </div>
            </div>
          )}
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
                  <div className="w-full h-14 bg-white/20 rounded-2xl p-4 border border-white/20 flex items-center justify-between">
                    <span>Change Profile Name</span>
                    <button className="bg-white/45 px-4 py-1 rounded-xl text-sm font-semibold hover:bg-white/60">
                      Edit
                    </button>
                  </div>
                  <div className="w-full h-14 bg-white/20 rounded-2xl p-4 border border-white/20 flex items-center justify-between">
                    <span>Adjust Daily Calorie Goals</span>
                    <button className="bg-white/45 px-4 py-1 rounded-xl text-sm font-semibold hover:bg-white/60">
                      Edit
                    </button>
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
