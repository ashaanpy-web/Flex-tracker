export default function BackgroundGlows({ activeTab }) {
  const getGLowClasses = () => {
    if (activeTab === "dashboard") {
      return {
        glow1: "from-lime-400/40 to-emerald-400/20",
        glow2: "from-sky-400/40 to-indigo-400/20",
        glow3: "from-orange-300/30 to-red-400/30",
      };
    }
    if (activeTab === "workout") {
      return {
        glow1: "from-red-500/40 to-orange-500/20",
        glow2: "from-amber-500/30 to-yellow-400/20",
        glow3: "from-rose-500/30 to-purple-600/20",
      };
    }
    if (activeTab === "logger") {
      return {
        glow1: "from-orange-400/40 to-amber-400/20",
        glow2: "from-sky-400/30 to-cyan-500/20",
        glow3: "from-yellow-300/20 to-red-500/20",
      };
    }
    if (activeTab === "settings") {
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
    <div className="w-full h-full fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className={`absolute top-[-10%] left-[-10%] w-[80vw] max-w-[500px] h-[80vw] max-h-[500px] rounded-full bg-linear-to-br ${glows.glow1} blur-3xl transition-all duration-700 ease-in-out`}
      />
      <div
        className={`absolute bottom-[-10%] right-[-5%] w-[80vw] max-w-[600px] h-[80vw] max-h-[600px] rounded-full bg-linear-to-tr ${glows.glow2} blur-3xl transition-all duration-700 ease-in-out`}
      />
      <div
        className={`bg-linear-to-br ${glows.glow3} w-[70vw] max-w-[500px] h-[70vw] max-h-[500px] rounded-full absolute bottom-[-5%] right-[-5%] blur-3xl transition-all duration-700 ease-in-out`}
      />
    </div>
  );
}
