import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,

  LinearScale,

  PointElement,

  LineElement,

  Tooltip,

  Legend,
);

const TemperatureChart = ({ history }) => {
  const data = {
    labels: history
      .slice()
      .reverse()
      .map((item) => item.id),

    datasets: [
      {
        label: "Temperature",

        data: history
          .slice()
          .reverse()
          .map((item) => item.temperature),

        borderColor: "#ef4444",

        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl">
      <Line data={data} />
    </div>
  );
};

export default TemperatureChart;
