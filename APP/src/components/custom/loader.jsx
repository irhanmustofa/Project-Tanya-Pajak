const Loader = ({ text }) => {
  return (
    <div className="flex flex-col mt-40 items-center text-primary">
      {/* Spinner */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute w-full h-full border-4 border-current border-t-transparent rounded-full animate-spin"></div>
        <div
          className="w-8 h-8 border-4 border-neutral-500 border-t-transparent rounded-full animate-spin"
          style={{ animationDirection: "reverse" }}
        ></div>
      </div>

      {/* Typing Text */}
      <div className="text-2xl font-semibold mt-4" id="typing-text">
        {text || "Loading Data..."}
      </div>

      {/* Barber-style neutral progress bar */}
      <div className="w-64 h-2 bg-neutral-300 dark:bg-neutral-700 rounded-full mt-6 overflow-hidden relative">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 40%, transparent 40%)",
            backgroundSize: "20px 100%",
            animation: "barber 5s linear infinite", // 👈 slower barber
            opacity: 0.7,
          }}
        ></div>
      </div>

      {/* Keyframes for barber animation */}
      <style>{`
        @keyframes barber {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 0%; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
