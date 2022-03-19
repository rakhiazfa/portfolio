/* ====================================
# Navbar
==================================== */

export const links = [
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

export const navbarCondition = {
    active: {
        menuWrapper: `
            absolute inset-0 h-screen
            bg-black bg-opacity-75
        `,
        menu: `
            absolute top-[5rem] left-[1rem] right-[1rem]
            flex flex-col gap-5
            bg-white text-primary
            rounded-md px-5 py-7
        `,
        link: `
            block w-full border border-primary
            text-primary text-center
            rounded-md py-2
        `,
    },
    nonactive: {
        menuWrapper: "",
        menu: "hidden sm:flex items-center gap-10",
        link: "",
    },
};
