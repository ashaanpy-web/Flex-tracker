import "./index.css";
export default function App() {
  return (
    <>
      <div className="bg-slate-200/80 min-h-screen relative pt-5 pb-5 pl-3 flex overflow-hidden ">
        <div className="w-full h-full absolute top-0 left-0 z-0">
          <div className="absolute top-[-20%] left-[-20%] w-150 h-150 rounded-full bg-linear-to-br from-lime-400/40 to-emerald-400/20 blur-3xl pointer-events-none z-0"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-175 h-175 rounded-full bg-linear-to-tr from-sky-400/40 to-indigo-400/20 blur-3xl pointer-events-none z-0 "></div>
          <div className="bg-linear-to-br from-orange-300/30 to-red-400/30 h-150 w-150  rounded-full absolute bottom-[-5%] right-[-5%] z-0 blur-3xl pointer-events-none"></div>
        </div>
        <aside className="flex flex-col z-10 bg-white/5 border relative border-white/40 backdrop-blur-3xl w-60 h-[calc(100Vh-40px)] rounded-3xl pr-2 pl-2 shadow-2xl   ">
          <div className=" ">
            <div>
              <div className="flex items-center gap-3">
                <div className="bg-black h-5 w-5 rounded-full animate-pulse duration-1000"></div>
                <p className="text-black font-extrabold text-3xl">
                  Flextracker
                </p>
              </div>
              <div className="hover:bg-white text-black font-bold text-xl p-3 rounded-2xl bg-white/20 border border-white/30 mt-5 flex items-center gap-3">
                <i class="fa-solid fa-house"></i>
                Dashboard
              </div>
              <div className="text-black font-bold text-xl p-3 rounded-2xl bg-white/20 border border-white/30 mt-5 flex items-center gap-3">
                <i class="fa-solid fa-dumbbell"></i>
                Workout log
              </div>
              <div className="text-black font-bold text-xl p-3 rounded-2xl bg-white/20 border border-white/30 mt-5 flex items-center gap-3">
                <i class="fa-solid fa-gear"></i>
                Settings
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto z-10 p-8 overflow-x-hidden">
          <h1 className="text-3xl font-extrabold tracking-tight ">
            WELCOME BACK ,Ashaan!
          </h1>
          <div className="flex gap-10">
            <div className="p-3 h-30 w-80 bg-white/5 rounded-3xl border border-white/40 shadow-2xl backdrop-blur-3xl  mt-5 ">
              <p className="text-xl font-bold">Todays Chalories</p>
              <p className=" mt-3 text-xl font-semibold tracking-tight">
                3200/2800kcal
              </p>
              <div className="mt-3 w-70 h-3.5 bg-linear-to-br from-lime-500/50 to-emerald-600 rounded-full"></div>
            </div>
            <div className="p-3 h-30 w-80 bg-white/5 rounded-3xl border border-white/40 shadow-2xl backdrop-blur-3xl  mt-5 ">
              <p className="text-xl font-bold">Todays Protien</p>
              <p className=" mt-3 text-xl font-semibold tracking-tight">
                150g/130g
              </p>
              <div className="mt-3 w-70 h-3.5 bg-linear-to-br from-blue-700/50  to-sky-800/45 rounded-full"></div>
            </div>
            <div className="h-30 w-40 bg-white/5 rounded-3xl border border-white/40 shadow-2xl backdrop-blur-3xl mt-5"></div>
          </div>
          <div className="flex items-center ">
            <div className="h-80 w-180  pr-7 mt-5 flex">
              <div className="h-full w-full bg-white/5 border border-white/40 backdrop-blur-3xl shadow-2xl rounded-3xl "></div>
            </div>
            <div className="h-80 w-40 bg-white/5 border border-white/40 backdrop-blur-3xl shadow-2xl rounded-3xl mt-5"></div>
          </div>
        </main>
      </div>
    </>
  );
}
