import ContactSection from '@/components/container/sections/contact-section';
import Link from 'next/link';

export default function Contact() {
    return (
        <main>
            <section className="w-full py-[5rem]">
                <div className="app-container">
                    <h1 className="max-w-[475px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide !leading-[1.35] mb-[3rem]">
                        Keep In Touch
                    </h1>
                    <div>
                        <h4 className="mb-3">Start a conversation</h4>
                        <Link
                            href="mailto:rakhiazfa0421@gmail.com?subject=Collaboration%20Opportunity&body=Hello%20there%2C%0A%0AI'm%20interested%20in%20exploring%20a%20potential%20collaboration%20on%20a%20project.%20Could%20we%20discuss%20further%20details%3F%0A%0AThank%20you"
                            className="text-2xl font-medium hover:underline"
                        >
                            rakhiazfa0421@gmail.com
                        </Link>
                    </div>
                </div>
            </section>
            <ContactSection />
        </main>
    );
}
