import React from "react";
import Layout from "../components/Layouts/Layout";
import Topbar from "../components/Navigations/Topbar";
import myinnovillage from "../assets/images/projects/myinnovillage.png";
import pertamina from "../assets/images/projects/pertamina.png";
import roots from "../assets/images/projects/roots.png";
import groch from "../assets/images/projects/groch.png";
import { Link } from "react-router-dom";

const projects = [
    {
        title: "My Innovillage",
        image: myinnovillage,
        desc: "Website to assess an innovation made by students.",
    },
    {
        title: "Pertamina Port Bau Bau",
        image: pertamina,
        desc: "Website to manage ship data at the port.",
    },
    {
        title: "The Roots",
        image: roots,
        desc: "Website for managing visitor data in restaurants.",
    },
    {
        title: "Groch",
        image: groch,
        desc: "Landing page for website course.",
        to: "https://groch.netlify.app",
    },
];

const Project = () => {
    return (
        <Layout
            title="Projects - Rakhi Azfa Rifansya"
            className="relative min-h-screen bg-[#0e1317]"
        >
            <Topbar />

            <main>
                <section className="overflow-x-hidden pt-32 pb-20">
                    <div className="wrapper">
                        <h1
                            className="text-4xl lg:text-5xl text-orange-400 font-bold tracking-wider mb-24"
                            data-aos="fade-right"
                        >
                            Projects
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
                            {projects?.map((project, index) => (
                                <Link
                                    className="relative block h-full"
                                    to={project?.to}
                                    target="_blank"
                                    key={index}
                                    data-aos="zoom-in"
                                    data-aos-duration={250 * (index + 1)}
                                >
                                    <img
                                        className="rounded-lg"
                                        src={project?.image}
                                        alt="My Innovillage"
                                    />
                                    <div className="relative text-white p-5 z-[50] rounded-bl-lg rounded-br-lg">
                                        <h2 className="font-medium mb-3">
                                            {project?.title}
                                        </h2>
                                        <p className="text-sm text-gray-400">
                                            {project?.desc}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default Project;
