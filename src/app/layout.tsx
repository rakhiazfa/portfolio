import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import Layout from '@/components/layouts/main-layout';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Rakhi Azfa Rifansya',
    description:
        'Welcome to my portfolio! As an experienced fullstack developer, I specialize in building responsive and efficient web applications with the latest technologies.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
            <body className={inter.className}>
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
