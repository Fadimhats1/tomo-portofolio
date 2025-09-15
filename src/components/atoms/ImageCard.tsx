import React from 'react';
import CardContainer, { type CardContainerProps } from './CardContainer';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import SafeImage, { type SafeImageProps } from './SafeImage';
import { motion, type HTMLMotionProps } from 'motion/react';

interface ImageCardProps {
    cardProps?: Omit<CardContainerProps, 'children'>;
    imageWrapperProps?: HTMLMotionProps<'div'>;
    imageProps: SafeImageProps;
    imageOverlay?: React.ReactNode;
    containerProps?: HTMLMotionProps<'div'>;
    children: React.ReactNode;
}

const ImageCard: React.FC<ImageCardProps> = ({ cardProps = {}, imageWrapperProps = {}, imageProps, imageOverlay, containerProps = {}, children }) => {
    return (
        <CardContainer {...cardProps} className={twMerge(clsx('gap-0 overflow-hidden rounded-2xl p-0', cardProps.className))} isHorizontal={false}>
            <motion.div {...imageWrapperProps} className={clsx('relative', imageWrapperProps.className)}>
                <SafeImage {...imageProps} alt={`${imageProps.alt || 'Card'} Image`} />
                {imageOverlay}
            </motion.div>
            <motion.div {...containerProps} className={twMerge(clsx('flex flex-col gap-2 p-6', containerProps.className))}>
                {children}
            </motion.div>
        </CardContainer>
    );
};

export default ImageCard;
