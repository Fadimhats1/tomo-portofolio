import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Link } from 'react-router';
import { motion, type HTMLMotionProps } from 'framer-motion'; // make sure it's 'framer-motion'

type IconName = keyof typeof LucideIcons;

export interface IconBadgeProps {
    name: IconName;
    size?: number;
    className?: string;
    wrapperProps?: HTMLMotionProps<'div'>;
    to?: string;
    external?: boolean;
}

const IconBadge: React.FC<IconBadgeProps> = ({
    name,
    size = 20,
    className,
    wrapperProps = {},
    to,
    external,
}) => {
    const LucideIcon = LucideIcons[name] as LucideIcon;

    const content = (
        <motion.div
            {...wrapperProps}
            className={twMerge(
                clsx('bg-apple-blue/25 rounded-xl p-3.5', wrapperProps.className)
            )}
        >
            <LucideIcon size={size} className={twMerge(clsx('text-apple-blue', className))} />
        </motion.div>
    );

    if (!to) return content;

    if (external) {
        return (
            <a href={to} target="_blank" rel="noopener noreferrer">
                {content}
            </a>
        );
    }

    return <Link to={to}>{content}</Link>;
};

export default IconBadge;
