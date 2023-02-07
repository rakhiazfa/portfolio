import React from "react";
import Experience from "../components/About/Sections/Experience";
import Layout from "../components/Layouts/Layout";
import Topbar from "../components/Navigations/Topbar";

const About = () => {
    return (
        <Layout
            title="About - Rakhi Azfa Rifansya"
            className="relative min-h-screen bg-[#0e1317] text-white"
        >
            <Topbar />

            <main>
                <Experience />
            </main>
        </Layout>
    );
};

export default About;
