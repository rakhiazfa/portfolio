'use client';

import ContactSection from '@/components/container/sections/contact-section';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Title from '@/components/ui/title';

export default function Contact() {
    return (
        <main>
            <section className="w-full py-[5rem]">
                <div className="app-container">
                    <Title className="mb-10">Keep In Touch</Title>
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.85 }}
                        viewport={{ once: true }}
                    >
                        <div>
                            <h4 className="mb-3">Start a conversation</h4>
                            <Link
                                href="mailto:rakhiazfa0421@gmail.com?subject=Collaboration%20Opportunity&body=Hello%20there%2C%0A%0AI'm%20interested%20in%20exploring%20a%20potential%20collaboration%20on%20a%20project.%20Could%20we%20discuss%20further%20details%3F%0A%0AThank%20you"
                                className="text-2xl font-medium hover:underline"
                            >
                                rakhiazfa0421@gmail.com
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
            <ContactSection />
        </main>
    );
}
