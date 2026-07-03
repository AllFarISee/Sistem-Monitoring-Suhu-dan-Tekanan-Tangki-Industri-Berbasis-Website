import { FaIndustry } from "react-icons/fa";

const Navbar = () => {

    return (

        <nav className="bg-slate-900 border-b border-slate-700">

            <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

                <div className="flex items-center gap-3">

                    <FaIndustry
                        className="text-cyan-400 text-3xl"
                    />

                    <div>

                        <h1
                            className="text-white text-2xl font-bold"
                        >

                            Industrial Tank Monitoring

                        </h1>

                        <p
                            className="text-slate-400 text-sm"
                        >

                            ESP32 Monitoring Dashboard

                        </p>

                    </div>

                </div>

                <div>

                    <span
                        className="bg-green-600 text-white px-4 py-2 rounded-full"
                    >

                        ● ONLINE

                    </span>

                </div>

            </div>

        </nav>

    );

};

export default Navbar;