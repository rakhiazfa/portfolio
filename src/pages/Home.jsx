import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";

const Home = () => {
    return (
        <main className="relative min-h-screen overflow-hidden">
            <div className="wrapper min-h-screen flex items-center">
                <div className="max-w-[600px]">
                    <h1 className="text-[clamp(1.5rem,8vw,3.25rem)] font-bold leading-[1.35]">
                        Hello, <span className="text-blue-400">i am</span>
                    </h1>
                    <h1 className="text-[clamp(1.5rem,8vw,3.25rem)] font-bold leading-[1.35] mb-4">
                        Rakhi Azfa Rifansya
                    </h1>
                    <p className="text-gray-300 mb-5">
                        I am a student who is interested in website development,
                        especially frontend development.
                    </p>
                    <Link
                        className="flex items-center gap-2 text-gray-300 hover:text-gray-400 font-light transition-all duration-150"
                        to="/about"
                    >
                        Show More About Me <AiOutlineRight />
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Home;
