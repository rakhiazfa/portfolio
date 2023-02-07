import React from "react";
import { NavLink } from "react-router-dom";

const Topbar = () => {
    return (
        <header className="absolute z-[500] w-full h-[75px] flex items-center">
            <div className="w-full justify-center">
                <nav>
                    <ul className="flex justify-center items-center gap-10 lg:gap-16">
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                to="/"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                to="/about"
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                to="/projects"
                            >
                                Projects
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Topbar;
