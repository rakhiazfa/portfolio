import { database, storage } from '@/services/firebase';
import { get, ref as databaseRef } from 'firebase/database';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import ProjectCard from '@/components/container/project-card';
import Title from '@/components/ui/title';

const getProjects = async () => {
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

    return projects;
};

export default async function Projects() {
    const projects = await getProjects();

    return (
        <main>
            <section id="project" className="w-full py-[5rem]">
                <div className="app-container">
                    <Title className="mb-10">Projects</Title>
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-7 md:gap-x-10 gap-y-10">
                        {projects.map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
