import techStack from '@/assets/data/tech-stack';
import { motion } from 'framer-motion';

const AboutSection = () => {
    return (
        <section id="about" className="w-full py-[5rem]">
            <div className="app-container">
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.85 }}
                    viewport={{ once: true }}
                >
                    <h1 className="max-w-[475px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide !leading-[1.35] mb-7">
                        Let's Find Out About Me
                    </h1>
                </motion.div>
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.85 }}
                    viewport={{ once: true }}
                >
                    <p className="max-w-[600px] leading-loose mb-10">
                        I am a Fullstack Developer with more than 1 year of experience. I have experience creating websites using
                        various programming languages and frameworks. I also really enjoy learning new technologies. I'm currently
                        learning more about Microservices Architecture, Next JS, and Nest JS.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.85 }}
                    viewport={{ once: true }}
                >
                    <h1 className="max-w-[475px] text-xl sm:text-2xl font-bold tracking-wide !leading-[1.35] mb-10">
                        Tech Stack
                    </h1>
                </motion.div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.75 }}
                        viewport={{ once: true }}
                    >
                        <TechStack title="Programming Languages" items={techStack.languages} />
                    </motion.div>
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.85 }}
                        viewport={{ once: true }}
                    >
                        <TechStack title="Back-End Development" items={techStack.backend} />
                    </motion.div>
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.95 }}
                        viewport={{ once: true }}
                    >
                        <TechStack title="Front-End Development" items={techStack.frontend} />
                    </motion.div>
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1.05 }}
                        viewport={{ once: true }}
                    >
                        <TechStack title="Others" items={techStack.etc} />
                    </motion.div>
                </div>
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

export default AboutSection;
