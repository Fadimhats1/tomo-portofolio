import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, type HTMLMotionProps } from 'motion/react';

export interface CardContainerProps extends HTMLMotionProps<'div'> {
    isHorizontal?: boolean;
    children: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ className, isHorizontal = true, children, ...rest }) => {
    return (
        <motion.div {...rest} className={twMerge(clsx('bg-apple-gray5 flex w-full gap-4 rounded-xl p-4', !isHorizontal && 'flex-col', className))}>
            {children}
        </motion.div>
    );
};

export default CardContainer;
