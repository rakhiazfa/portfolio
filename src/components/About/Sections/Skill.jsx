import React from "react";

const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "PHP",
    "Laravel",
    "React JS",
    "Bootstrap",
    "Tailwind CSS",
];

const Skill = () => {
    return (
        <section className="overflow-x-hidden pb-20">
            <div className="wrapper">
                <h1
                    className="text-4xl lg:text-5xl text-orange-400 font-bold tracking-wider mb-24"
                    data-aos="fade-right"
                >
                    Skills
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {skills?.map((skill, index) => (
                        <div
                            className="
                                bg-gray-800 bg-opacity-50 rounded-lg px-5 py-3
                            "
                            key={index}
                            data-aos="zoom-in"
                            data-aos-duration={250 * (index + 1)}
                        >
                            <p className="text-lg font-medium text-center">
                                {skill}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skill;
