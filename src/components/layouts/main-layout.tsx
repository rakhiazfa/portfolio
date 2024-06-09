import NextTopLoader from 'nextjs-toploader';
import Topbar from '../container/topbar';
import Footer from '../container/footer';
import Cursor from '../ui/cursor';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Cursor />
            <NextTopLoader showSpinner={false} height={2} zIndex={15000} speed={350} color="#ea580c" />
            <div className="relative z-[1]">
                <Topbar />
                <div className="mt-[75px]">{children}</div>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
