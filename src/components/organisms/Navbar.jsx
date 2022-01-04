import React from "react";
import { Link } from "react-router-dom";

const Links = [
    {
        content: "Home",
        to: "/",
    },
    {
        content: "About",
        to: "/about",
    },
    {
        content: "Projects",
        to: "/projects",
    },
    {
        content: "Contacts",
        to: "/contacts",
    },
];

const Navbar = () => {
    return (
        <nav className="absolute top-0 z-50 w-full h-[70px]">
            <div className="wrapper h-full flex items-center justify-between">
                <div className=""></div>
                <ul className="flex items-center gap-10">
                    {Links.map((link, index) => (
                        <li>
                            <Link to={link.to}>{link.content}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
