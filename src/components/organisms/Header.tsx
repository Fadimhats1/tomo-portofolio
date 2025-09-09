import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import Button from '../atoms/Button';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAnimationToggle } from '../../hooks/useAnimationToggle';
import CardContainer from '../atoms/CardContainer';

const Header = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 48, width: 51.72 });
    const location = useLocation();

    useEffect(() => {
        if (!containerRef.current) return;

        const links = Array.from(containerRef.current.querySelectorAll('a'));
        const activeLink = links.find(link => link.getAttribute('href') === location.pathname) as HTMLAnchorElement | undefined;

        if (activeLink) {
            const rect = activeLink.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            setIndicatorStyle({
                left: rect.left - containerRect.left,
                width: rect.width,
            });
        }
    }, [location.pathname]);

    useEffect(() => {
        close(true);
    }, [location.pathname]);

    const navigationLinks = [
        { to: '/', label: 'About' },
        { to: '/resumes', label: 'Resume' },
        { to: '/projects', label: 'Project' },
        { to: '/certificates', label: 'Certificate' },
        { to: '/contact', label: 'Contact' },
    ];

    const { close, state, element, toggle } = useAnimationToggle({
        children: state => (
            <div
                className={twMerge(
                    clsx(
                        'text-apple-label-primary absolute top-16 left-0 z-50 w-full overflow-hidden px-4 transition-all duration-300 ease-out',
                        state === 'showed' ? 'opacity-100' : 'opacity-0'
                    )
                )}
            >
                <CardContainer isHorizontal={true} className='border border-apple-gray3'>
                    <nav className="flex w-full flex-col gap-2">
                        {navigationLinks.map(link => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    twMerge(
                                        clsx(
                                            'text-apple-label-secondary hover:text-apple-label-primary hover:bg-apple-gray4/50 w-full rounded-lg px-3 py-2 font-medium transition-colors',
                                            isActive && 'text-apple-label-primary bg-apple-blue'
                                        )
                                    )
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                </CardContainer>
            </div>
        ),
        animation: {
            duration: 300,
        },
    });

    return (
        <header className="bg-apple-gray6 xl:border-apple-gray4 fixed top-0 z-10 w-full xl:border-e 2xl:w-[1535px]">
            <div className="relative">
                {/* Mobile Header */}
                <div className="flex items-center justify-between px-4 py-4 sm:px-6 md:hidden md:py-6">
                    <h1 className="text-apple-label-primary text-xl font-bold">Fathariq Dimas | Tomo</h1>
                    <Button variant="outline" className="rounded-lg p-3" onClick={toggle} aria-label={state === 'showed' ? 'Close menu' : 'Open menu'}>
                        {state === 'showed' ? <X size={16} /> : <Menu size={16} />}
                    </Button>
                </div>

                {/* Mobile Dropdown */}
                {element}
            </div>

            {/* Desktop Navigation */}
            <div ref={containerRef} className="relative hidden items-center gap-8 px-12 py-4 md:flex md:py-6 lg:ms-80">
                {navigationLinks.map(link => (
                    <NavLink key={link.to} to={link.to} className="text-apple-label-secondary text-lg font-medium">
                        {link.label}
                    </NavLink>
                ))}

                {/* Indicator */}
                <span
                    className="bg-apple-blue absolute top-[53px] h-1 rounded-full transition-all duration-300 ease-in-out"
                    style={{
                        left: indicatorStyle.left,
                        width: indicatorStyle.width,
                    }}
                />
            </div>
        </header>
    );
};

export default Header;
