import Header from '../organisms/Header';
import Sidebar from '../organisms/Sidebar';
import Footer from '../organisms/Footer';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Outlet, useLocation } from 'react-router';
import { useContext, useEffect, useLayoutEffect } from 'react';
import { AppContext } from '../../App';

interface MainLayoutProps {
    bodyClass?: string;
    layoutContainerClass?: string;
    isShowHeader?: boolean;
    isShowSidebar?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ bodyClass, layoutContainerClass, isShowHeader = true, isShowSidebar = true }) => {
    const { pathname } = useLocation();
    const context = useContext(AppContext);

    useLayoutEffect(() => {
        if (!context) return;

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        if (!context.scrollPadding && scrollbarWidth > 0) {
            context.setGlobalValue(prev => ({
                ...prev,
                scrollPadding: scrollbarWidth,
            }));
        }

        // Apply padding before paint
        document.body.style.paddingRight = `${scrollbarWidth > 0 ? 0 : context.scrollPadding}px`;

        window.scrollTo({ top: 0, behavior: 'instant' });

        return () => {
            // Remove padding after unmount
            document.body.style.paddingRight = '';
        };
    }, [pathname, context]);

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
