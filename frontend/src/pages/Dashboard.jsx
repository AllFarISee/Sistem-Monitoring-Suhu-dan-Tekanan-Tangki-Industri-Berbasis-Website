import Navbar from "../components/layout/Navbar";
import TankVisualization from "../components/tank/TankVisualization";
import StatusCard from "../components/cards/StatusCard";
import { useEffect, useState } from "react";
import { getLatestSensor, getSensorHistory } from "../services/sensorService";
import {
  FaTemperatureHigh,
  FaGaugeHigh,
  FaCircleCheck,
  FaWifi,
} from "react-icons/fa6";
import TemperatureChart from "../components/charts/TemperatureChart";
import PressureChart from "../components/charts/PressureChart";
import StatisticsCard from "../statistic/StatisticCard";
import HistoryTable from "../components/table/HistoryTable";

const Dashboard = () => {
  const [sensor, setSensor] = useState(null);
  const [history, setHistory] = useState([]);
  const loadData = async () => {
    const latest = await getLatestSensor();
    const historyData = await getSensorHistory();

    setSensor(latest);
    setHistory(historyData);
    console.log(latest);
  };
  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 2000);

    return () => clearInterval(interval);
  }, []);

  const calculateStats = (field) => {
    if (!history.length) {
      return {
        current: 0,

        average: 0,

        maximum: 0,

        minimum: 0,
      };
    }

    const values = history.map((item) => Number(item[field]));

    return {
      current: values[0],

      average: values.reduce((a, b) => a + b, 0) / values.length,

      maximum: Math.max(...values),

      minimum: Math.min(...values),
    };
  };

  const tempStats = calculateStats("temperature");

  const pressureStats = calculateStats("pressure");

  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid md:grid-cols-4 gap-5">
          <StatusCard
            title="Temperature"
            value={sensor?.temperature ?? "--"}
            unit="°C"
            subtitle="Tank Temperature"
            icon={<FaTemperatureHigh />}
            color="text-red-400"
          />

          <StatusCard
            title="Pressure"
            value={sensor?.pressure ?? "--"}
            unit="%"
            subtitle="Tank Pressure"
            icon={<FaGaugeHigh />}
            color="text-cyan-400"
          />

          <StatusCard
            title="Status"
            value={sensor?.status ?? "--"}
            subtitle="System Status"
            icon={<FaCircleCheck />}
            color="text-green-400"
          />

          <StatusCard
            title="Network"
            value="ONLINE"
            subtitle="ESP32 Connected"
            icon={<FaWifi />}
            color="text-blue-400"
          />
        </div>
        <div className="mt-8">
          <TankVisualization
            pressure={sensor?.pressure ?? 0}
            temperature={sensor?.temperature ?? 0}
            status={sensor?.status ?? "NORMAL"}
          />
        </div>
        <div className="mt-8 space-y-6">
          <StatisticsCard
            title="Temperature Statistics"
            current={tempStats.current}
            average={tempStats.average}
            maximum={tempStats.maximum}
            minimum={tempStats.minimum}
            color="text-red-400"
          />

          <StatisticsCard
            title="Pressure Statistics"
            current={pressureStats.current}
            average={pressureStats.average}
            maximum={pressureStats.maximum}
            minimum={pressureStats.minimum}
            color="text-cyan-400"
          />
        </div>
        <div className="mt-8">
          <HistoryTable history={history} />
        </div>
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <TemperatureChart history={history} />

          <PressureChart history={history} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
