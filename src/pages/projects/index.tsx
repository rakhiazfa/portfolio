import { database } from '@/services/firebase';
import { get, ref as databaseRef } from 'firebase/database';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Projects({ projects }: { projects: any[] }) {
    return (
        <main>
            <section id="project" className="w-full py-[5rem]">
                <div className="app-container">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.85 }}
                        viewport={{ once: true }}
                    >
                        <h1 className="max-w-[475px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide !leading-[1.35] mb-20">
                            Projects
                        </h1>
                    </motion.div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 75, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 * (index + 1) }}
                                viewport={{ once: true }}
                            >
                                <div className="w-full">
                                    <div className="relative w-full aspect-[4/2] bg-gray-300 rounded-lg">
                                        <Image
                                            src={`/images/projects/${project.image}`}
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            className="w-full h-auto object-cover rounded-lg"
                                            alt={project.title}
                                            priority={true}
                                        />
                                    </div>
                                    <div className="px-2 py-5">
                                        <h1 className="text-base font-bold tracking-wider mb-3">{project.title}</h1>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

export async function getStaticProps() {
    const snapshot = await get(databaseRef(database, 'projects'));
    const data = snapshot.exists() ? snapshot.val() : {};
    const projects = Object.keys(data).map((key) => {
        return data[key];
    });

    return { props: { projects } };
}
