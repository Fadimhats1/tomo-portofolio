import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface BadgeProps extends HTMLMotionProps<'p'> {
    variant?: 'primary' | 'secondary';
}

const Badge: React.FC<BadgeProps> = ({ variant = 'primary', children, className, ...rest }) => {
    const variantStyles: Record<'primary' | 'secondary', string> = {
        primary: 'bg-apple-blue/25 text-apple-blue',
        secondary: 'bg-apple-gray4 text-apple-label-secondary',
    };

    return (
        <motion.p className={twMerge(clsx('w-fit rounded-full px-4 py-1.5 text-sm', variantStyles[variant], className))} {...rest}>
            {children}
        </motion.p>
    );
};

export default Badge;
