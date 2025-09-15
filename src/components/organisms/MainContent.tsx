import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export interface MainContentProps {
    title?: string;
    titleClassName?: string;
    mainContentClass?: string;
    contentWrapperClass?: string;
    children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ title, titleClassName, mainContentClass, contentWrapperClass, children }) => {
    return (
        <main className={twMerge(clsx('bg-apple-gray6 relative flex min-h-[calc(100vh-56px)] flex-col gap-6 pt-[76px] pb-10 lg:ms-80', mainContentClass))}>
            <div className={twMerge(clsx('flex flex-1 flex-col gap-10 px-4 sm:px-6 md:px-12', contentWrapperClass))}>
                {/* Page Section Title */}
                {title && <h2 className={twMerge(clsx('text-apple-label-primary text-4xl font-bold', titleClassName))}>{title}</h2>}

                {/* Content */}
                {children}
            </div>
        </main>
    );
};

export default MainContent;
