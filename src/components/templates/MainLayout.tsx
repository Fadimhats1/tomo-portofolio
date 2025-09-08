import Header from '../organisms/Header';
import Sidebar from '../organisms/Sidebar';
import Footer from '../organisms/Footer';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';

interface MainLayoutProps {
    bodyClass?: string;
    layoutContainerClass?: string;
    isShowHeader?: boolean;
    isShowSidebar?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ bodyClass, layoutContainerClass, isShowHeader = true, isShowSidebar = true }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    return (
        <div className={twMerge(clsx('bg-apple-gray6', bodyClass))}>
            <div className={twMerge(clsx('xl:border-apple-gray4 relative mx-auto max-w-[1536px] xl:border-x', layoutContainerClass))}>
                {/* Header */}
                {isShowHeader && <Header />}

                {/* Sidebar */}
                {isShowSidebar && <Sidebar />}

                {/* Main Content */}
                <Outlet />

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
