import React from 'react';
import IconBadge, { type IconBadgeProps } from '../atoms/IconBadge';
import CardContainer, { type CardContainerProps } from '../atoms/CardContainer';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InfoCardProps extends Omit<CardContainerProps, 'children'> {
    iconProps: IconBadgeProps;
    title: string;
    description: string | React.ReactNode;
    titleClassName?: string;
    descriptionClassName?: string;
    onClickDescription?: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ iconProps, title, description, titleClassName, descriptionClassName, onClickDescription, ...rest }) => {
    return (
        <CardContainer className={clsx('items-center', rest.className)} isHorizontal={rest.isHorizontal}>
            <IconBadge {...iconProps} />
            <div>
                <p className={twMerge(clsx('text-apple-label-tertiary text-xs', titleClassName))}>{title}</p>
                <p className={twMerge(clsx('text-apple-label-secondary text-sm font-light', descriptionClassName))} onClick={onClickDescription}>
                    {description}
                </p>
            </div>
        </CardContainer>
    );
};

export default InfoCard;
