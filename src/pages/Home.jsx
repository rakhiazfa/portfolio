import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";

const Home = () => {
    return (
        <main className="relative min-h-screen overflow-hidden">
            <div className="wrapper min-h-screen flex items-center">
                <div className="max-w-[550px]">
                    <h1 className="text-[clamp(1.5rem,7vw,3rem)] font-bold leading-tight">
                        Hello, <span className="text-blue-400">i am</span>
                    </h1>
                    <h1 className="text-[clamp(1.5rem,7vw,3rem)] font-bold mb-5">
                        Rakhi Azfa Rifansya
                    </h1>
                    <p className="text-gray-300 mb-4">
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
