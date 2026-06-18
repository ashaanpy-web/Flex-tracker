import { useState } from "react";
import "./index.css";
export default function App() {
  const { activeTab, setActiveTab } = useState("dashboard");
  return (
    <>
      <div className="bg-slate-200/80 min-h-screen relative pt-5 pb-5 pl-3 flex overflow-hidden costum-scrollbar ">
        <div className="w-full h-full absolute top-0 left-0 z-0">
          <div className="absolute top-[-20%] left-[-20%] w-150 h-150 rounded-full bg-linear-to-br from-lime-400/40 to-emerald-400/20 blur-3xl pointer-events-none z-0"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-175 h-175 rounded-full bg-linear-to-tr from-sky-400/40 to-indigo-400/20 blur-3xl pointer-events-none z-0 "></div>
          <div className="bg-linear-to-br from-orange-300/30 to-red-400/30 h-150 w-150  rounded-full absolute bottom-[-5%] right-[-5%] z-0 blur-3xl pointer-events-none"></div>
        </div>
        <aside className="flex flex-col z-10 bg-white/5 border relative border-white/40 backdrop-blur-3xl w-60 h-[calc(100Vh-40px)] rounded-3xl pr-2 pl-2 shadow-2xl  no-scrollbar ">
          <div className=" ">
            <div>
              <div className="flex items-center gap-3">
                <div className="bg-black h-5 w-5 rounded-full animate-pulse duration-1000"></div>
                <p className="text-black font-extrabold text-3xl">
                  Flextracker
                </p>
              </div>
              <div
                onClick={() => setActiveTab("dashboard")}
                className="hover:bg-white text-black font-bold text-xl p-3 rounded-2xl bg-white/20 border border-white/30 mt-5 flex items-center gap-3"
              >
                {activeTab == "dashboard" && (
                  <>
                    <i class="fa-solid fa-house"></i>
                    Dashboard
                  </>
                )}
              </div>
              <div
                onClick={() => setActiveTab("workout")}
                className="text-black font-bold text-xl p-3 rounded-2xl bg-white/20 border border-white/30 mt-5 flex items-center gap-3"
              >
                {activeTab == "workout" && (
                  <>
                    <i class="fa-solid fa-dumbbell"></i>
                    Workout log
                  </>
                )}
              </div>
              <div
                onClick={() => setActiveTab("settings")}
                className="text-black font-bold text-xl p-3 rounded-2xl bg-white/20 border border-white/30 mt-5 flex items-center gap-3"
              >
                <i class="fa-solid fa-gear"></i>
                Settings
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto z-10 p-8 overflow-x-hidden no-scrollbar">
          <h1 className="text-3xl font-extrabold tracking-tight ">
            WELCOME BACK ,Ashaan!
          </h1>
          <div className="flex gap-10">
            <div className="p-3 h-30 w-80 bg-white/5 rounded-3xl border border-white/40 shadow-2xl backdrop-blur-3xl  mt-5 ">
              <div className="flex items-center gap-2">
                <i class="fa-solid fa-fire"></i>
                <p className="text-xl font-bold">Todays Calories</p>
              </div>
              <p className=" mt-3 text-xl font-semibold tracking-tight">
                3200/2800kcal
              </p>
              <div className="mt-3 w-70 h-3.5 bg-linear-to-br from-lime-500/50 to-emerald-600 rounded-full"></div>
            </div>
            <div className="p-3 h-30 w-80 bg-white/5 rounded-3xl border border-white/40 shadow-2xl backdrop-blur-3xl  mt-5 ">
              <div className="flex items-center gap-2">
                <i class="fa-solid fa-shrimp"></i>
                <p className="text-xl font-bold">Todays Protein</p>
              </div>
              <p className=" mt-3 text-xl font-semibold tracking-tight">
                150g/130g
              </p>
              <div className="mt-3 w-70 h-3.5 bg-linear-to-br from-blue-700/50  to-sky-800/45 rounded-full"></div>
            </div>
            <div className="p-3 h-30 w-40 bg-white/5 rounded-3xl border border-white/40 shadow-2xl backdrop-blur-3xl mt-5">
              <div>
                <p className="text-xl font-bold ">Weight</p>
                <p className="text-xl font-semibold">65kg</p>
                <p className="text-blue-500/60 font-bold text-xs mt-3">
                  Target:70kg
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center ">
            {/* --- TODAYS GOALS CARD --- */}
            <div className="h-80 w-178 pr-7 mt-5 flex">
              <div className="h-full w-full bg-white/5 border border-white/40 backdrop-blur-3xl shadow-2xl rounded-3xl p-5 flex flex-col costum-scrollbar">
                {/* Heading apni jagah fix rahegi */}
                <p className="text-xl font-bold tracking-tight mb-2">
                  Todays GOALS
                </p>

                {/* Scrollable Container (Is par max height aur scroll active kiya hai) */}
                <div className="flex-1 overflow-y-auto pr-2 min-h-0 costum-scrollbar">
                  <div className="w-full h-20 bg-white/45 shadow-2xl mt-3 border-white/4 rounded-2xl"></div>
                  <div className="w-full h-20 bg-white/45 shadow-2xl mt-3 border-white/4 rounded-2xl"></div>
                  <div className="w-full h-20 bg-white/45 shadow-2xl mt-3 border-white/4 rounded-2xl"></div>
                  <div className="w-full h-20 bg-white/45 shadow-2xl mt-3 border-white/4 rounded-2xl"></div>{" "}
                  {/* 4th dummy row check karne ke liye */}
                </div>
              </div>
            </div>
            <div className="h-80 w-40 bg-white/5 border border-white/40 backdrop-blur-3xl shadow-2xl rounded-3xl mt-5 ml-2"></div>
          </div>
        </main>
      </div>
    </>
  );
}
