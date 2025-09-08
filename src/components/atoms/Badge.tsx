import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface BadgeProps extends React.HTMLAttributes<HTMLParagraphElement> {
    variant?: 'primary' | 'secondary';
}

const Badge: React.FC<BadgeProps> = ({ variant = 'primary', children, className, ...rest }) => {
    const variantStyles: Record<typeof variant, string> = {
        primary: 'bg-apple-blue/25 text-apple-blue',
        secondary: 'bg-apple-gray4 text-apple-label-secondary',
    };

    return (
        <p className={twMerge(clsx('w-fit rounded-full px-4 py-1.5 text-sm', variantStyles[variant], className))} {...rest}>
            {children}
        </p>
    );
};

export default Badge;
