import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Link } from 'react-router';

type IconName = keyof typeof LucideIcons;

export interface IconBadgeProps {
    name: IconName;
    size?: number;
    className?: string;
    wrapperClassName?: string;
    to?: string;
    external?: boolean;
}

const IconBadge: React.FC<IconBadgeProps> = ({ name, size = 20, className, wrapperClassName, to, external }) => {
    const LucideIcon = LucideIcons[name] as LucideIcon;

    const content = (
        <div className={twMerge(clsx('bg-apple-blue/25 rounded-xl p-3.5', wrapperClassName))}>
            <LucideIcon size={size} className={twMerge(clsx('text-apple-blue', className))} />
        </div>
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
