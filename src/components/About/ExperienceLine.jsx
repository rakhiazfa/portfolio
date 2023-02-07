import React, { Fragment } from "react";
import { AiOutlineCalendar } from "react-icons/ai";

const ExperienceLine = ({ experiences }) => {
    return (
        <div className="grid grid-cols-2 gap-12 mt-12">
            {experiences?.map((experience, index) => {
                const isEven = (index + 1) % 2 === 0;
                return (
                    <Fragment key={index}>
                        <div>
                            <div
                                className="relative"
                                data-aos={isEven ? "fade-left" : "fade-right"}
                            >
                                <h3 className="text-sm sm:text-base lg:text-lg mb-3">
                                    {experience?.title}
                                </h3>
                                <p className="text-xs lg:text-sm text-gray-400 flex items-center gap-x-3">
                                    <AiOutlineCalendar className="text-xl" />
                                    {experience?.timeSpan}
                                </p>
                                <div
                                    className={`absolute top-0 w-5 h-5 bg-blue-500 rounded-full border-4 border-white ${
                                        isEven
                                            ? "left-[-2.15rem]"
                                            : "right-[-2.15rem]"
                                    }`}
                                ></div>
                            </div>
                        </div>
                        {!isEven && (
                            <>
                                <div />
                                <div />
                            </>
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
};

export default ExperienceLine;
