'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export type Project = {
    image: string;
    title: string;
    description: string;
};

const ProjectCard = ({ project, duration = 0.85 }: { project: Project; duration?: number }) => {
    return (
        <motion.div
            initial={{ y: 75, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: duration }}
            viewport={{ once: true }}
        >
            <div className="w-full">
                <div className="relative w-full aspect-[4/2] bg-gray-300">
                    <Image
                        src={project.image}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto object-cover"
                        alt={project.title}
                        priority
                    />
                    <div className="absolute inset-0 top-0 left-0 shadow-[inset_2.5px_2.5px_25px_rgba(0,0,0,0.75)]"></div>
                </div>
                <div className="mt-5">
                    <h1 className="text-lg sm:text-2xl md:text-[clamp(0.95rem,2vw,1.35rem)] font-bold tracking-widest leading-normal mb-3">
                        {project.title}
                    </h1>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
