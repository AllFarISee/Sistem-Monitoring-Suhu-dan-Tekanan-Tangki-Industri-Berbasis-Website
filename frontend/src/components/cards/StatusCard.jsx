import CountUpModule from "react-countup";
import {
  FaTemperatureHigh,
  FaGaugeHigh,
  FaCircleCheck,
  FaTriangleExclamation,
  FaCircleXmark,
  FaWifi,
} from "react-icons/fa6";
const CountUp = CountUpModule.default;
const StatusCard = ({ title, value, unit, icon, color, subtitle }) => {
  const isNumber = typeof value === "number";
  const getStatusIcon = (status) => {
    switch (status) {
      case "NORMAL":
        return <FaCircleCheck className="text-green-400" />;

      case "WARNING":
        return <FaTriangleExclamation className="text-yellow-400" />;

      case "DANGER":
        return <FaCircleXmark className="text-red-500" />;

      default:
        return <FaCircleCheck className="text-gray-400" />;
    }
  };
  return (
    <div
      className="
            bg-slate-800
            border
            border-slate-700
            rounded-2xl
            p-6
            shadow-xl
            hover:scale-105
            duration-300
        "
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400">{title}</p>

          <div className="text-3xl font-bold text-white mt-2">
            {isNumber ? (
              <>
                <CountUp end={value} duration={1} />
                {unit}
              </>
            ) : (
              value
            )}
          </div>

          <p className="text-slate-500 mt-3">{subtitle}</p>
        </div>

        <div
          className={`
                        ${color}
                        text-5xl
                    `}
        >
          <div className="text-4xl">
            {title === "Status" ? getStatusIcon(value) : icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
