import { IconType } from 'react-icons';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

type SocialMedia = {
    icon: IconType;
    href: string;
    name: string;
};

const socialMedia: SocialMedia[] = [
    {
        icon: FaInstagram,
        href: 'https://instagram.com/rakhi.azfa',
        name: 'Instagram'
    },
    {
        icon: FaLinkedin,
        href: 'https://www.linkedin.com/in/rakhiazfa',
        name: 'LinkedIn'
    },
    {
        icon: FaGithub,
        href: 'https://github.com/rakhiazfa',
        name: 'Github'
    }
];

export default socialMedia;
