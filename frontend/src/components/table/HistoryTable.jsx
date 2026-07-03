const getStatusClass = (status) => {
  switch (status) {
    case "NORMAL":
      return "bg-green-500/20 text-green-400";

    case "WARNING":
      return "bg-yellow-500/20 text-yellow-400";

    case "DANGER":
      return "bg-red-500/20 text-red-400";

    default:
      return "bg-slate-700 text-white";
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleString("id-ID");
};

const HistoryTable = ({ history }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">

      <h2 className="text-white text-xl font-semibold mb-6">
        Sensor History
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700 text-slate-300">

              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Temperature</th>
              <th className="text-left p-3">Pressure</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Time</th>

            </tr>

          </thead>

          <tbody>

            {history.map((item) => (

              <tr
                key={item.id}
                className="border-b border-slate-700 hover:bg-slate-700/40 transition"
              >

                <td className="p-3 text-white">
                  {item.id}
                </td>

                <td className="p-3 text-red-400">
                  {item.temperature}°C
                </td>

                <td className="p-3 text-cyan-400">
                  {item.pressure}%
                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(item.status)}`}
                  >
                    {item.status}
                  </span>

                </td>

                <td className="p-3 text-slate-400">
                  {formatDate(item.created_at)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default HistoryTable;