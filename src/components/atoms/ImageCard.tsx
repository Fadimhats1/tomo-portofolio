import React from 'react';
import CardContainer from './CardContainer';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import SafeImage from './SafeImage';

interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
    cardClassName?: string;
    imgWrapperClassName?: string;
    imageClassName?: string;
    containerClassName?: string;
    image?: string;
    alt?: string;
    imageOverlay?: React.ReactNode;
    children: React.ReactNode;
}

const ImageCard: React.FC<ImageCardProps> = ({ cardClassName, imgWrapperClassName, containerClassName, image, alt, imageOverlay, children, ...rest }) => {
    return (
        <CardContainer {...rest} className={twMerge(clsx('gap-0 overflow-hidden rounded-2xl p-0', cardClassName))} isHorizontal={false}>
            <div className={clsx('relative', imgWrapperClassName)}>
                <SafeImage src={image} alt={`${alt || 'Card'} Image`} />
                {imageOverlay}
            </div>
            <div className={twMerge(clsx('flex flex-col gap-2 p-6', containerClassName))}>{children}</div>
        </CardContainer>
    );
};

export default ImageCard;
