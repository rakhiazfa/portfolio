import React, { useState } from "react";
import ExperienceCard from "../ExperienceCard";

const educationExperiences = [
    {
        title: "SMP NEGERI 7 BANDUNG",
        timeSpan: "2017 - 2020",
    },
    {
        title: "SMK BPP BANDUNG",
        timeSpan: "2020 - 2023",
    },
];

const workExperiences = [
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
    const experiences = [educationExperiences, workExperiences];

    const [selected, setSelected] = useState(0);

    return (
        <section className="overflow-x-hidden pt-32">
            <div className="wrapper">
                <h1
                    className="text-4xl lg:text-5xl text-orange-400 font-bold tracking-wider mb-24"
                    data-aos="fade-right"
                >
                    Experiences
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div data-aos="fade-right">
                        <h2 className="text-xl lg:text-2xl text-center font-semibold mb-16">
                            Education
                        </h2>

                        <ExperienceCard experiences={educationExperiences} />
                    </div>
                    <div data-aos="fade-left">
                        <h2 className="text-xl lg:text-2xl text-center font-semibold mb-16">
                            Work
                        </h2>

                        <ExperienceCard experiences={workExperiences} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
