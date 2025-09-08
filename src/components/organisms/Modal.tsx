import clsx from 'clsx';
import { X } from 'lucide-react';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    footer?: React.ReactNode;
    children: React.ReactNode;
    maxHeight?: string;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    preventBodyScroll?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    footer,
    children,
    maxHeight = 'max-h-[80vh]',
    closeOnOverlayClick = true,
    closeOnEscape = true,
    preventBodyScroll = true,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        // The timeout cleanup will be handled by the effect cleanup
        setTimeout(() => {
            onClose();
        }, 200); // Match animation duration
    }, [onClose]);

    const handleOverlayClick = useCallback(
        (e: React.MouseEvent) => {
            if (closeOnOverlayClick && e.target === e.currentTarget) {
                handleClose();
            }
        },
        [handleClose, closeOnOverlayClick]
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (closeOnEscape && e.key === 'Escape') {
                handleClose();
            }

            // Trap focus within modal
            if (e.key === 'Tab' && modalRef.current) {
                const focusableElements = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstElement = focusableElements[0] as HTMLElement;
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        },
        [handleClose, closeOnEscape]
    );

    useEffect(() => {
        if (isOpen) {
            // Store the currently focused element
            previousActiveElement.current = document.activeElement as HTMLElement;

            // Prevent body scroll
            if (preventBodyScroll) {
                const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }

            // Add event listeners
            document.addEventListener('keydown', handleKeyDown);

            // Show modal with slight delay for smooth animation
            const timer = setTimeout(() => {
                setIsVisible(true);
                // Focus the close button or first focusable element
                closeButtonRef.current?.focus();
            }, 10);

            return () => {
                clearTimeout(timer);
                document.removeEventListener('keydown', handleKeyDown);

                if (preventBodyScroll) {
                    document.body.style.overflow = '';
                    document.body.style.paddingRight = '';
                }

                // Restore focus to the previously focused element
                if (previousActiveElement.current) {
                    previousActiveElement.current.focus();
                    previousActiveElement.current = null;
                }
            };
        }
    }, [isOpen, handleKeyDown, preventBodyScroll]);

    // Don't render
    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
        >
            {/* Overlay with fade animation */}
            <div
                className={clsx('fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-200 ease-out', isVisible ? 'opacity-100' : 'opacity-0')}
                onClick={handleOverlayClick}
                aria-hidden="true"
            />

            {/* Modal content with scale + fade animation */}
            <div
                ref={modalRef}
                className={clsx(
                    'bg-apple-gray6 text-apple-label-primary relative z-50 flex w-full max-w-2xl flex-col rounded-lg shadow-lg transition-all duration-200 ease-out',
                    isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-95 opacity-0',
                    maxHeight
                )}
            >
                {/* Header - Fixed */}
                <div className={clsx('border-apple-gray4/20 flex flex-shrink-0 items-center border-b p-4 md:p-6', title ? 'justify-between' : 'justify-end')}>
                    {title && (
                        <h2 id="modal-title" className="pr-4 text-xl font-semibold">
                            {title}
                        </h2>
                    )}
                    <button
                        ref={closeButtonRef}
                        onClick={handleClose}
                        className="hover:text-apple-label-primary/70 hover:bg-apple-gray4/50 flex-shrink-0 cursor-pointer rounded-md p-1 transition-colors"
                        aria-label="Close modal"
                        type="button"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="scrollbar-none flex-1 overflow-y-auto p-4 md:p-6">{children}</div>

                {/* Footer - Fixed */}
                {footer && <div className="border-apple-gray4/20 border-t p-4 md:p-6">{footer}</div>}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
