import React from "react";
import Hero from "../components/Home/Sections/Hero";
import Layout from "../components/Layouts/Layout";
import Topbar from "../components/Navigations/Topbar";

const Project = () => {
    return (
        <Layout title="Projects - Rakhi Azfa Rifansya">
            <Topbar />

            <main>
                <Hero />
            </main>
        </Layout>
    );
};

export default Project;
