import { InputField } from '@/components/ui/input-field';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { motion } from 'framer-motion';
import { TextareaField } from '@/components/ui/textarea-field';
import { FormEvent } from 'react';

const ContactSection = () => {
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    };

    return (
        <section id="contact" className="w-full py-[5rem]">
            <div className="app-container">
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <h1 className="max-w-[475px] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide !leading-[1.35] mb-7">
                        Contact Me
                    </h1>
                    <div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-7">
                            <div className="flex flex-col md:flex-row items-center gap-5">
                                <InputField label="Name" placeholder="Full Name" />
                                <InputField label="Email" placeholder="Email Address" />
                            </div>
                            <TextareaField label="Message" placeholder="Write here your message" />
                            <div className="flex justify-end">
                                <HoverBorderGradient
                                    containerClassName="rounded-full"
                                    as="button"
                                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                                >
                                    <span>Send Message</span>
                                </HoverBorderGradient>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;
