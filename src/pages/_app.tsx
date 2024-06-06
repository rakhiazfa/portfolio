import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import AOS from 'aos';
import '@/styles/globals.css';
import 'aos/dist/aos.css';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        AOS.init({
            duration: 750,
            easing: 'ease-in-out',
            once: true
        });
    }, []);

    return (
        <div className={inter.className}>
            <Component {...pageProps} />
        </div>
    );
}
