import { useCallback, useEffect, useState } from 'react';
import CardContainer from '../components/atoms/CardContainer';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface UseDropdownProps {
    children: React.ReactNode;
}

interface DropdownInfo {
    isOpen: boolean;
    state: 'opening' | 'closing' | 'idle';
}

export const useDropdown = ({ children }: UseDropdownProps) => {
    const [dropdownInfo, setDropdownState] = useState<DropdownInfo>({
        isOpen: false,
        state: 'idle',
    });

    const toggle = useCallback(() => {
        setDropdownState(prev => ({
            ...prev,
            isOpen: !prev.isOpen,
        }));
    }, []);

    const open = useCallback(() => {
        setDropdownState(prev => ({
            ...prev,
            isOpen: true,
        }));
    }, []);

    const close = useCallback(() => {
        setDropdownState({
            isOpen: false,
            state: 'idle',
        });
    }, []);

    useEffect(() => {
        let timer: number;

        if (dropdownInfo.isOpen) {
            timer = setTimeout(() => {
                setDropdownState(prev => ({
                    ...prev,
                    state: 'opening',
                }));
            }, 10);
        } else if (!dropdownInfo.isOpen && dropdownInfo.state === 'opening') {
            setDropdownState(prev => ({
                ...prev,
                state: 'closing',
            }));
        } else if (dropdownInfo.state === 'closing') {
            timer = setTimeout(() => {
                setDropdownState(prev => ({
                    ...prev,
                    state: 'idle',
                }));
            }, 200);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [dropdownInfo.isOpen, dropdownInfo.state]);

    const element =
        !dropdownInfo.isOpen && dropdownInfo.state === 'idle' ? null : (
            <div
                className={twMerge(
                    clsx(
                        'text-apple-label-primary absolute top-16 left-0 z-50 w-full overflow-hidden px-4 transition-all duration-200 ease-out',
                        dropdownInfo.state === 'opening' ? 'opacity-100' : 'opacity-0'
                    )
                )}
            >
                <CardContainer isHorizontal={true}>{children}</CardContainer>
            </div>
        );

    return {
        isOpen: dropdownInfo.isOpen,
        toggle,
        open,
        close,
        element,
    };
};
