import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";
import { links, navbarCondition } from "../../assets/data";

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 600) {
                setIsActive(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (isActive) {
            document.querySelector("body").style.overflow = "hidden";
        } else {
            document.querySelector("body").style.overflow = "auto";
        }
    }, [isActive]);

    return (
        <nav className="absolute top-0 z-50 w-full h-[70px]">
            <div className="wrapper h-full flex items-center justify-between">
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-3xl text-red-400 font-black tracking-widest">
                        R.
                    </h1>
                    <button
                        className="z-50 flex sm:hidden text-2xl"
                        onClick={() => setIsActive(!isActive)}
                    >
                        {isActive ? <VscChromeClose /> : <RiMenu3Line />}
                    </button>
                </div>
                <div
                    className={
                        isActive
                            ? navbarCondition.active.menuWrapper
                            : navbarCondition.nonactive.menuWrapper
                    }
                >
                    <ul
                        className={
                            isActive
                                ? navbarCondition.active.menu
                                : navbarCondition.nonactive.menu
                        }
                    >
                        {links.map((link, index) => (
                            <li key={index}>
                                <Link
                                    className={
                                        isActive
                                            ? navbarCondition.active.link
                                            : navbarCondition.nonactive.link
                                    }
                                    to={link.to}
                                >
                                    {link.content}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
