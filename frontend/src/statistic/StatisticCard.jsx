import CountUpModule from "react-countup";

const CountUp = CountUpModule.default;

const StatisticsCard = ({
    title,
    current,
    average,
    maximum,
    minimum,
    color
}) => {

    const Item = ({ label, value }) => (
        <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-slate-400 text-sm">{label}</p>

            <h2 className={`text-2xl font-bold mt-2 ${color}`}>
                <CountUp
                    end={Number(value)}
                    duration={1}
                    decimals={1}
                />
            </h2>
        </div>
    );

    return (

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">

            <h2 className="text-white text-xl font-semibold mb-5">

                {title}

            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <Item label="Current" value={current} />

                <Item label="Average" value={average} />

                <Item label="Maximum" value={maximum} />

                <Item label="Minimum" value={minimum} />

            </div>

        </div>

    )

}

export default StatisticsCard