import React from "react";
import Layout from "../components/Layouts/Layout";
import Hero from "../components/Home/Sections/Hero";
import Topbar from "../components/Navigations/Topbar";

const Home = () => {
    return (
        <Layout title="Home - Rakhi Azfa Rifansya" className="relative">
            <Topbar />

            <main>
                <Hero />
            </main>
        </Layout>
    );
};

export default Home;
