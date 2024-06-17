'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RiMenu3Fill } from 'react-icons/ri';
import Footer from './footer';

const links = [
    {
        href: '/projects',
        name: 'Projects'
    },
    {
        href: '/services',
        name: 'Services'
    },
    {
        href: '/articles',
        name: 'Articles'
    },
    {
        href: '/contact',
        name: 'Contact'
    }
];

const Topbar = () => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (active) {
            document.querySelector('html')?.classList.add('overflow-y-hidden');
            document.querySelector('html')?.classList.add('md:overflow-y-auto');

            document.body.classList.add('overflow-y-hidden');
        } else {
            document.querySelector('html')?.classList.remove('overflow-y-hidden');
            document.querySelector('html')?.classList.remove('md:overflow-y-auto');

            document.body.classList.remove('overflow-y-hidden');
        }
    }, [active]);

    return (
        <header className={`fixed top-0 left-0 z-[10000] w-full h-[75px] border-b border-semi-dark flex items-center glass`}>
            <div className="app-container flex justify-between items-center">
                <div className="w-full md:w-max flex md:block justify-between items-center">
                    <Link href="/" className="text-2xl font-bold" onClick={() => setActive(false)}>
                        RA
                    </Link>
                    <button className="block md:hidden p-0" onClick={() => setActive(!active)}>
                        <RiMenu3Fill className="text-2xl" />
                    </button>
                </div>
                <nav
                    className={`
                        absolute md:static top-[75px] left-0 w-full md:w-max 
                        bg-dark md:bg-transparent border-b md:border-none border-semi-dark 
                        overflow-hidden transition-all duration-300 
                        ${active ? 'h-[calc(100vh-75px)] md:h-max opacity-100' : 'h-0 md:h-max opacity-0 md:opacity-100'} 
                    `}
                >
                    <ul className="flex flex-col md:flex-row md:items-center gap-0 md:gap-10">
                        {links.map(({ href, name }, index) => (
                            <li key={index}>
                                <Link
                                    href={href}
                                    className="
                                        w-full h-[50px] md:h-max md:w-max flex md:block items-center 
                                        hover:bg-semi-dark md:hover:bg-transparent 
                                        text-semi-light px-5 md:px-0
                                    "
                                    onClick={() => setActive(false)}
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Footer className="block md:hidden absolute bottom-0 left-0" />
                </nav>
            </div>
        </header>
    );
};

export default Topbar;
