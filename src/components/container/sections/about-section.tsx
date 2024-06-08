import { motion } from 'framer-motion';

const AboutSection = () => {
    return (
        <section id="about" className="w-full min-h-[550px] lg:min-h-[600px] py-[3.75rem]">
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <div className="app-container">
                    <h1 className="max-w-[475px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide !leading-[1.35] mb-10">
                        Let's Find Out About Me
                    </h1>
                    <p className="max-w-[500px] leading-loose">
                        I am a Fullstack Developer with more than 1 year of experience. I have experience in creating websites
                        using various programming languages and framework.
                        <br />
                        <br />
                        I'm currently learning more about Microservices Architecture, Next JS, and Nest JS.
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default AboutSection;
