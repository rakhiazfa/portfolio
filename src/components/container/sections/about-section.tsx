import techStack from '@/assets/data/tech-stack';
import { motion } from 'framer-motion';

const AboutSection = () => {
    return (
        <section id="about" className="w-full py-[3.25rem]">
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
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.85 }}
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-1 gap-10">
                        <div className="border-b border-semi-dark pb-5">
                            <h3 className="text-base mb-5">Front-End Development</h3>
                            <div className="flex items-center gap-5">
                                {techStack.frontend.map((item, index) => (
                                    <div key={index} className="bg-semi-dark rounded-full px-3 py-1">
                                        <span className="text-xs tracking-wider">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="border-b border-semi-dark pb-5">
                            <h3 className="text-base mb-5">Back-End Development</h3>
                            <div className="flex items-center gap-5">
                                {techStack.backend.map((item, index) => (
                                    <div key={index} className="bg-semi-dark rounded-full px-3 py-1">
                                        <span className="text-xs tracking-wider">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="border-b border-semi-dark pb-5">
                            <h3 className="text-base mb-5">Others</h3>
                            <div className="flex items-center gap-5">
                                {techStack.etc.map((item, index) => (
                                    <div key={index} className="bg-semi-dark rounded-full px-3 py-1">
                                        <span className="text-xs tracking-wider">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
