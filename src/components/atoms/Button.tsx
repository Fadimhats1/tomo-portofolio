import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

// forwardRef here 👇
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, variant = 'primary', size = 'md', isLoading = false, className, ...props }, ref) => {
    const baseStyles =
        'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed';

    const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
        primary: 'border border-apple-blue bg-apple-blue text-white hover:bg-blue-600 hover:border-blue-600',
        secondary: 'border border-apple-gray4 bg-apple-gray4 text-apple-label-primary hover:bg-apple-gray3 hover:border-apple-gray3',
        outline: 'border border-apple-gray3 text-apple-label-primary hover:bg-apple-gray4',
    };

    const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            ref={ref} // ✅ forward the ref
            className={twMerge(clsx(baseStyles, variantStyles[variant], sizeStyles[size], className))}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <svg className="mr-2 h-4 w-4 animate-spin text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
            ) : null}
            {children}
        </button>
    );
});

Button.displayName = 'Button'; // ✅ for debugging with forwardRef

export default Button;
