import AboutSection from '@/components/container/sections/about-section';
import ContactSection from '@/components/container/sections/contact-section';
import HeroSection from '@/components/container/sections/hero-section';

export default function Home() {
    return (
        <main>
            <HeroSection />
            <AboutSection />
            <ContactSection />
        </main>
    );
}
