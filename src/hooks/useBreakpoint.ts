import { useEffect, useState } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface BreakpointInfo {
    breakpoint: Breakpoint;
    width: number;
}

export function useBreakpoint(): BreakpointInfo {
    const [breakpoint, setBreakpoint] = useState<BreakpointInfo>(() => getBreakpoint(window.innerWidth));

    function getBreakpoint(width: number): BreakpointInfo {
        if (width >= 1536)
            return {
                breakpoint: '2xl',
                width: 1536,
            };
        if (width >= 1280)
            return {
                breakpoint: 'xl',
                width: 1280,
            };
        if (width >= 1024)
            return {
                breakpoint: 'lg',
                width: 1024,
            };
        if (width >= 768)
            return {
                breakpoint: 'md',
                width: 768,
            };
        return {
            breakpoint: 'sm',
            width: 0,
        };
    }

    useEffect(() => {
        const handleResize = () => {
            setBreakpoint(getBreakpoint(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return breakpoint;
}
