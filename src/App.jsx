import "./index.css";
export default function App() {
  return (
    <>
      <div className="bg-slate-200/80 min-h-screen relative">
        <div className="w-full h-full z-0">
          <div className="absolute top-[-20%] left-[-20%] w-150 h-150 rounded-full bg-linear-to-br from-lime-400/40 to-emerald-400/20 blur-3xl pointer-events-none z-0"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-175 h-175 rounded-full bg-linear-to-tr from-sky-400/40 to-indigo-400/20 blur-3xl pointer-events-none z-0 "></div>
          <div className="bg-linear-to-br from-orange-500/60 to-red-600/60 h-150 w-150  rounded-full absolute bottom-[-5%] right-[-5%] z-0 blur-3xl pointer-events-none"></div>
        </div>
        <div className="z-10 bg-white/5 border relative border-white/40 backdrop-blur-3xl w-60 min-h-screen rounded-3xl pr-2 pl-2">
          <div className=" ">
            <div>
              <p className="text-black font-extrabold text-4xl">Flex tracker</p>
              <div className="text-black font-bold text-xl p-3 rounded-2xl bg-white/20 border border-white/30 mt-5 flex items-center gap-3">
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
        </div>
      </div>
    </>
  );
}
