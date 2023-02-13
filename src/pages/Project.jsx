import React from "react";
import Layout from "../components/Layouts/Layout";
import Topbar from "../components/Navigations/Topbar";
import { Link } from "react-router-dom";
import projects from "../assets/data/projects";

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
                                    data-aos-duration={75 * (index + 1)}
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
