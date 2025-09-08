import { CircleQuestionMark } from 'lucide-react';
import React, { useState } from 'react';
import fallback from '../../assets/images/fallback.png';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
    wrapperClassName?: string;
}

interface ErrorState {
    isInitial: boolean;
    isError: boolean;
}

const SafeImage: React.FC<SafeImageProps> = ({ fallbackSrc, wrapperClassName, alt, ...props }) => {
    const [errorState, setErrorState] = useState<ErrorState>({
        isInitial: true,
        isError: false,
    });

    if (!props.src) {
        return (
            <div className={twMerge(clsx('bg-apple-label-quaternary flex h-48 w-full items-center justify-center', props.className))}>
                <CircleQuestionMark size={96} className="text-apple-gray4" />
            </div>
        );
    }

    return (
        <div className={twMerge(clsx('relative h-48', wrapperClassName))}>
            {(errorState.isInitial || errorState.isError) && (
                <img
                    {...props}
                    src={fallback}
                    alt="Safe image"
                    className={twMerge(clsx('z-[1] block h-full w-full object-cover', props.className, 'absolute top-0 left-0'))}
                />
            )}

            {!errorState.isError && (
                <img
                    {...props}
                    alt={alt || 'Safe image'}
                    onError={() => {
                        setErrorState({
                            isInitial: false,
                            isError: true,
                        });
                    }}
                    onLoad={() => {
                        setErrorState({
                            ...errorState,
                            isInitial: false,
                        });
                    }}
                    className={twMerge(clsx('z-[2] block h-full w-full object-cover', props.className))}
                />
            )}
        </div>
    );
};

export default SafeImage;
