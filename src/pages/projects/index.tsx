import { database, storage } from '@/services/firebase';
import { get, ref as databaseRef } from 'firebase/database';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import Image from 'next/image';

export default function Projects({ projects }: { projects: any[] }) {
    console.log(projects);
    return (
        <main>
            <section id="project" className="w-full py-[5rem]">
                <div className="app-container">
                    <h1 className="max-w-[475px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide !leading-[1.35] mb-7">
                        Projects
                    </h1>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
                        {projects.map((project, index) => (
                            <div key={index} className="w-full">
                                <div className="relative w-full aspect-[4/2] bg-gray-300 rounded-lg">
                                    <Image
                                        src={project.image}
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="w-full h-auto object-cover rounded-lg"
                                        alt={project.title}
                                    />
                                </div>
                                <div className="px-3 py-5">
                                    <h1 className="text-sm font-semibold tracking-wider mb-3">{project.title}</h1>
                                    <p className="text-gray-300">{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

export async function getServerSideProps() {
    const snapshot = await get(databaseRef(database, 'projects'));
    const data = snapshot.exists() ? snapshot.val() : {};
    const projects = await Promise.all(
        Object.keys(data)
            .map((key) => {
                return data[key];
            })
            .map(async (project) => {
                const imageUrl = await getDownloadURL(storageRef(storage, `projects/${project?.image}`));

                return {
                    ...project,
                    image: imageUrl
                };
            })
    );

    return { props: { projects } };
}
