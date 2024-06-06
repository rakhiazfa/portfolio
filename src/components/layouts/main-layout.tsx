import NextTopLoader from 'nextjs-toploader';
import Topbar from '../container/topbar';
import Footer from '../container/footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NextTopLoader showSpinner={false} height={1} zIndex={15000} speed={350} color="#ea580c" />
            <Topbar />
            <div className="mt-[75px]">{children}</div>
            <Footer />
        </>
    );
};

export default Layout;
