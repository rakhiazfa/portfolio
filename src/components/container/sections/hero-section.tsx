'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

const HeroSection = () => {
    return (
        <section id="hero" className="relative w-full min-h-[550px] lg:min-h-[600px] flex justify-center items-center">
            <div className="relative z-[10] app-container flex justify-center items-center">
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.85 }}
                    viewport={{ once: true }}
                >
                    <div>
                        <h4 className="text-base md:text-lg mb-2">Hello, i'm</h4>
                        <h1 className="text-[clamp(1.5rem,7.5vw,3.75rem)] font-bold tracking-wide leading-normal mb-2">
                            Rakhi Azfa Rifansya
                        </h1>
                        <h2 className="text-lg sm:text-2xl md:text-3xl mb-7">Fullstack Developer</h2>
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                        >
                            <span>Download CV</span>
                        </HoverBorderGradient>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
