import React from "react";
import Experience from "../components/About/Sections/Experience";
import Skill from "../components/About/Sections/Skill";
import Layout from "../components/Layouts/Layout";
import Topbar from "../components/Navigations/Topbar";

const About = () => {
    return (
        <Layout
            title="About - Rakhi Azfa Rifansya"
            className="relative min-h-screen bg-[#0e1317] text-white"
        >
            <Topbar />

            <main className="grid gap-24">
                <Experience />
                <Skill />
            </main>
        </Layout>
    );
};

export default About;
