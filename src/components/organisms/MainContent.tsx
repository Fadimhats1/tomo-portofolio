import React, { useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import CardContainer from '../atoms/CardContainer';
import { AppContext } from '../../App';

export interface MainContentProps {
    title?: string;
    titleClassName?: string;
    mainContentClass?: string;
    contentWrapperClass?: string;
    children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ title, titleClassName, mainContentClass, contentWrapperClass, children }) => {
    const appContext = useContext(AppContext);

    return (
        <main className={twMerge(clsx('bg-apple-gray6 relative flex min-h-[calc(100vh-56px)] flex-col gap-6 pt-[76px] pb-10 lg:ms-80', mainContentClass))}>
            <div className={twMerge(clsx('flex flex-1 flex-col gap-10 px-4 sm:px-6 md:px-12', contentWrapperClass))}>
                {/* Page Section Title */}
                {title && <h2 className={twMerge(clsx('text-apple-label-primary text-4xl font-bold', titleClassName))}>{title}</h2>}

                {/* Content */}
                {children}
            </div>

            {/* OTHERS */}
            {appContext?.copyState === 'hide' ? null : (
                <CardContainer
                    className={clsx(
                        'absolute bottom-8 left-1/2 w-fit -translate-x-1/2 rounded-lg px-3 py-1.5 transition-all duration-300',
                        appContext && appContext.copyState === 'show' ? 'opacity-100' : 'opacity-0'
                    )}
                >
                    <p className="text-apple-label-primary text-sm">Copied!</p>
                </CardContainer>
            )}
        </main>
    );
};

export default MainContent;
