import React, { Fragment } from "react";

const ExperienceCard = ({ experiences }) => {
    return (
        <div className="relative grid grid-cols-2 gap-10">
            <div className="experience-line"></div>

            {experiences?.map((experience, index) => {
                const isEven = (index + 1) % 2 === 0;

                return (
                    <Fragment key={index}>
                        <div className="relative bg-gray-800 bg-opacity-50 rounded-lg px-5 py-3">
                            <h3 className="mb-3">{experience?.title}</h3>
                            <p className="text-sm text-gray-400">
                                {experience?.timeSpan}
                            </p>
                            <div
                                className={`
                                    absolute w-4 h-4 border-2 border-white 
                                    bg-orange-400 rounded-full top-[50%] 
                                    transform translate-y-[-50%] 
                                    ${
                                        isEven
                                            ? "left-[-1.75rem]"
                                            : "right-[-1.75rem]"
                                    }
                                `}
                            ></div>
                        </div>
                        <div />
                        <div />
                    </Fragment>
                );
            })}
        </div>
    );
};

export default ExperienceCard;
