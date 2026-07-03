const TankVisualization = ({ pressure, temperature, status }) => {
  // tinggi air (0 - 100%)
  const level = Math.max(0, Math.min(pressure, 100));

  // warna air
  let waterColor = "bg-cyan-500";

  if (status === "WARNING") {
    waterColor = "bg-yellow-500";
  }

  if (status === "DANGER") {
    waterColor = "bg-red-500 animate-pulse";
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
      <h2 className="text-white text-xl font-semibold mb-8">Industrial Tank</h2>

      <div className="flex justify-center">
        <div
          className="
                    relative
                    w-100
                    h-96
                    border-4
                    border-slate-300
                    rounded-b-3xl
                    rounded-t-xl
                    overflow-hidden
                    "
        >
          <div
            className={`
                            absolute
                            bottom-0
                            w-full
                            transition-all
                            duration-700
                            ${waterColor}
                        `}
            style={{
              height: `${level}%`,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-10 text-center">
        <div>
          <p className="text-slate-400">Pressure</p>

          <h2 className="text-cyan-400 text-2xl font-bold">{pressure}%</h2>
        </div>

        <div>
          <p className="text-slate-400">Temperature</p>

          <h2 className="text-red-400 text-2xl font-bold">{temperature}°C</h2>
        </div>

        <div>
          <p className="text-slate-400">Status</p>

          <h2 className="text-green-400 text-2xl font-bold">{status}</h2>
        </div>
      </div>
    </div>
  );
};

export default TankVisualization;
