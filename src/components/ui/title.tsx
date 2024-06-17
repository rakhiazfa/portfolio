'use client';

import { motion } from 'framer-motion';

const Title = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.85 }}
            viewport={{ once: true }}
            className={className}
        >
            <h1 className="max-w-[475px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide !leading-[1.35]">
                {children}
            </h1>
        </motion.div>
    );
};

export default Title;
