import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    isHorizontal?: boolean;
    children: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ className, isHorizontal = true, children, ...rest }) => {
    const classes = twMerge(clsx('p-4 rounded-xl w-full flex gap-4 bg-apple-gray5', !isHorizontal && 'flex-col', className));

    return (
        <div {...rest} className={classes}>
            {children}
        </div>
    );
};

export default CardContainer;
