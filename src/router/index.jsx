import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";
import Project from "../pages/Project";

const Router = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Project />} />
        </Routes>
    );
};

export default Router;
