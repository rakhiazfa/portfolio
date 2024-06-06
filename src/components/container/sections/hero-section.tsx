import { AnimatePresence, motion } from 'framer-motion';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';
import { useState } from 'react';

const HeroSection = () => {
    const [hovered, setHovered] = useState(false);

    return (
        <section
            id="hero"
            className="relative w-full min-h-[550px] lg:min-h-[600px] flex justify-center items-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative z-[10] app-container flex justify-center items-center">
                <div>
                    <h4 className="text-base md:text-lg mb-2">Hello, i'm</h4>
                    <h1 className="text-[clamp(1.5rem,7.5vw,3.75rem)] font-bold tracking-wide leading-normal mb-2">
                        Rakhi Azfa Rifansya
                    </h1>
                    <h2 className="text-lg sm:text-2xl md:text-3xl">Fullstack Developer</h2>
                </div>
            </div>
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full w-full absolute inset-0"
                    >
                        <CanvasRevealEffect
                            animationSpeed={5}
                            containerClassName="bg-transparent"
                            colors={[
                                [235, 50, 155],
                                [235, 125, 250]
                            ]}
                            opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
                            dotSize={2}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default HeroSection;
