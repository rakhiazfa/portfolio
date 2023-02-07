import React, { useState } from "react";

import ExperienceLine from "../ExperienceLine";

const educationHistories = [
    {
        title: "SMP NEGERI 7 BANDUNG",
        timeSpan: "2017 - 2020",
    },
    {
        title: "SMK BPP BANDUNG",
        timeSpan: "2020 - 2023",
    },
];

const workHistories = [
    {
        title: "PT BASIC TEKNOLOGI",
        timeSpan: "July 2022 - Dec 2022",
    },
    {
        title: "GREAT WEBSITE STUDIO",
        timeSpan: "Nov 2022 - Jan 2023",
    },
];

const Experience = () => {
    const experiences = [educationHistories, workHistories];

    const [selected, setSelected] = useState(0);

    return (
        <section className="overflow-x-hidden">
            <div className="wrapper h-[650px] min-h-screen flex flex-col justify-center items-center">
                <h1 className="text-2xl font-medium mb-10">Experience</h1>

                <div className="bg-gray-800 bg-opacity-50 flex items-center gap-7 rounded-lg mb-10 p-2">
                    <button
                        className={`
                            hover:bg-gray-700 w-[100px] md:w-[125px] text-sm rounded-lg py-2 
                            ${selected === 0 ? "bg-gray-700" : "bg-gray-800"}
                        `}
                        onClick={() => setSelected(0)}
                    >
                        Education
                    </button>
                    <button
                        className={`
                            hover:bg-gray-700 w-[100px] md:w-[125px] text-sm rounded-lg py-2 
                            ${selected === 1 ? "bg-gray-700" : "bg-gray-800"}
                        `}
                        onClick={() => setSelected(1)}
                    >
                        Work
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute left-[50%] transform translate-x-[-50%] top-0 bottom-[-1rem] w-1 bg-white rounded-full"></div>

                    <ExperienceLine experiences={experiences[selected]} />
                </div>
            </div>
        </section>
    );
};

export default Experience;
