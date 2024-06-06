import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Layout from '@/components/layouts/main-layout';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={inter.className}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </div>
    );
}
