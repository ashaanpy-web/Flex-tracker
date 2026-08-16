export default function BackgroundGlows({ activeTab }) {
  const getGlowClasses = () => {
    if (activeTab === "dashboard") {
      return {
        glow1: "from-lime-400/80 via-emerald-400/60 to-cyan-400/50",
        glow2: "from-sky-400/80 via-indigo-500/60 to-purple-500/50",
        glow3: "from-amber-300/70 via-orange-400/60 to-rose-500/50",
      };
    }
    if (activeTab === "workout") {
      return {
        glow1: "from-red-500/80 via-orange-500/70 to-amber-400/60",
        glow2: "from-amber-400/80 via-yellow-400/60 to-rose-500/50",
        glow3: "from-rose-500/80 via-pink-600/60 to-purple-600/50",
      };
    }
    if (activeTab === "logger") {
      return {
        glow1: "from-orange-400/80 via-amber-400/70 to-yellow-300/60",
        glow2: "from-sky-400/80 via-cyan-500/70 to-teal-400/60",
        glow3: "from-emerald-400/70 via-teal-500/60 to-cyan-400/50",
      };
    }
    if (activeTab === "settings") {
      return {
        glow1: "from-purple-500/80 via-indigo-500/70 to-blue-500/60",
        glow2: "from-cyan-400/70 via-blue-500/60 to-indigo-600/50",
        glow3: "from-fuchsia-500/70 via-pink-500/60 to-purple-600/50",
      };
    }
    return { glow1: "", glow2: "", glow3: "" };
  };

  const glows = getGlowClasses();

  return (
    <div className="w-full h-full fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className={`absolute top-[-10%] left-[-10%] w-[85vw] max-w-[650px] h-[85vw] max-h-[650px] rounded-full bg-gradient-to-br ${glows.glow1} blur-[100px] opacity-90 transition-all duration-700 ease-in-out`}
      />
      <div
        className={`absolute bottom-[-10%] right-[-5%] w-[85vw] max-w-[750px] h-[85vw] max-h-[750px] rounded-full bg-gradient-to-tr ${glows.glow2} blur-[120px] opacity-85 transition-all duration-700 ease-in-out`}
      />
      <div
        className={`bg-gradient-to-br ${glows.glow3} w-[75vw] max-w-[600px] h-[75vw] max-h-[600px] rounded-full absolute top-[30%] right-[20%] blur-[110px] opacity-80 transition-all duration-700 ease-in-out`}
      />
    </div>
  );
}
