import techStack from '@/assets/data/tech-stack';
import { motion } from 'framer-motion';

const ContactSection = () => {
    return (
        <section id="contact" className="w-full py-[3.75rem]">
            <div className="app-container">
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.85 }}
                    viewport={{ once: true }}
                >
                    <h1 className="max-w-[475px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide !leading-[1.35] mb-7">
                        Contact
                    </h1>
                </motion.div>
            </div>
        </section>
    );
};

const TechStack = ({ title, items }: { title: string; items: string[] }) => {
    return (
        <div className="pb-3">
            <h3 className="text-base mb-5">{title}</h3>
            <div className="w-full flex flex-wrap items-center gap-5">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-br from-blue-900 to-amber-900 rounded-full transform hover:scale-105 transition-all duration-300 px-3 py-1"
                    >
                        <span className="text-xs tracking-wider whitespace-nowrap">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactSection;
