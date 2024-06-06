import socialMedia from '@/assets/data/social-media';
import Link from 'next/link';

const Footer = ({ className }: { className?: string }) => {
    return (
        <footer className={`w-full border-t border-semi-dark py-7 ${className ?? ''}`}>
            <div className="app-container">
                <div className="flex flex-wrap justify-between items-center gap-x-10 gap-y-7">
                    <p className="text-xs text-semi-light">Copyright &copy; 2024, Rakhi Azfa Rifansya</p>
                    <div className="flex items-center gap-5">
                        {socialMedia.map(({ icon: Icon, href, name }, index) => (
                            <Link key={index} href={href} target="_blank" className="flex items-center gap-3 text-semi-light">
                                <Icon className="text-xl" />
                                <span className="text-xs">{name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
