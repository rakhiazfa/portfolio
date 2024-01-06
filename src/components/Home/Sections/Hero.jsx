import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../../assets/images/hero.webp";
import {
    AiOutlineInstagram,
    AiOutlineGithub,
    AiOutlineLinkedin,
} from "react-icons/ai";

const Hero = () => {
    return (
        <section className="relative min-h-screen overflow-x-hidden">
            <img
                className="absolute w-full h-full object-cover"
                src={heroImage}
                alt="Hero Image"
            />

            <div className="hero-bg absolute w-full h-full"></div>

            <div className="relative wrapper min-h-screen flex items-center">
                <div data-aos="fade-right">
                    <h1 className="text-[clamp(1.5rem,8vw,3rem)] text-white font-extrabold mb-5">
                        Hello,{" "}
                        <span className="text-orange-400 font-extrabold">
                            i'm
                        </span>
                        <br /> Rakhi Azfa Rifansya
                    </h1>
                    <p className="text-xl lg:text-2xl text-white mb-10">
                        Fullstack Developer
                    </p>
                    <div>
                        <ul className="flex items-center gap-10 lg:gap-16">
                            <li>
                                <Link
                                    className="text-3xl lg:text-4xl text-white hover:text-gray-300"
                                    to="https://github.com/rakhiazfa"
                                    target="_blank"
                                >
                                    <AiOutlineGithub />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-3xl lg:text-4xl text-white hover:text-gray-300"
                                    to="https://www.linkedin.com/in/rakhiazfa"
                                    target="_blank"
                                >
                                    <AiOutlineLinkedin />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-3xl lg:text-4xl text-white hover:text-gray-300"
                                    to="https://www.instagram.com/rakhi.azfa"
                                    target="_blank"
                                >
                                    <AiOutlineInstagram />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
