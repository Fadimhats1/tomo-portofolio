import React, { useRef } from 'react';
import fallback from '../../assets/images/fallback.png';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { motion, type HTMLMotionProps } from 'motion/react';

export interface SafeImageProps extends HTMLMotionProps<'img'> {
    wrapperProps?: HTMLMotionProps<'div'>;
    fallbackSrc?: string;
}

const SafeImage: React.FC<SafeImageProps> = ({ wrapperProps = {}, fallbackSrc = fallback, ...props }) => {
    const imageRef = useRef<HTMLImageElement | null>(null);

    return (
        <motion.div {...wrapperProps} className={twMerge(clsx('relative h-48', wrapperProps.className))}>
            <motion.img
                {...props}
                ref={imageRef}
                alt={props.alt || 'Safe image'}
                onError={() => {
                    if (!imageRef.current) return;

                    imageRef.current.src = fallbackSrc;
                }}
                className={twMerge(clsx('z-[2] block h-full w-full object-cover', props.className))}
            />
        </motion.div>
    );
};

export default SafeImage;
