import React from 'react';
import IconBadge, { type IconBadgeProps } from '../atoms/IconBadge';
import CardContainer, { type CardContainerProps } from '../atoms/CardContainer';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InfoCardProps extends Omit<CardContainerProps, 'children'>, IconBadgeProps {
    title: string;
    description: string | React.ReactNode;
    titleClassName?: string;
    descriptionClassName?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, titleClassName, descriptionClassName, ...rest }) => {
    const { className, isHorizontal, ...iconProps } = rest;

    return (
        <CardContainer className={clsx('items-center', className)} isHorizontal={isHorizontal}>
            <IconBadge {...iconProps} />
            <div>
                <p className={twMerge(clsx('text-apple-label-tertiary text-xs', titleClassName))}>{title}</p>
                <p className={twMerge(clsx('text-apple-label-secondary text-sm font-light', descriptionClassName))}>{description}</p>
            </div>
        </CardContainer>
    );
};

export default InfoCard;
