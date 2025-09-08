import React from 'react';
import CardContainer from '../atoms/CardContainer';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Star, StarHalf, User } from 'lucide-react';

interface TestimonialCardProps {
    image?: string;
    name: string;
    rating: number;
    testimonial?: string | React.ReactNode;
    nameClassName?: string;
    testimonialClassName?: string;
    cardClassName?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ image, name, rating = 5, testimonial, nameClassName, testimonialClassName, cardClassName }) => {
    const imageElement = image ? <img src={image} alt="Testimonial Image" className="h-12 w-12" /> : <User size={24} className="text-apple-blue" />;

    return (
        <CardContainer className={clsx('p-6 min-w-80', cardClassName)} isHorizontal={false}>
            <div className="flex w-full items-start gap-3">
                <div className="bg-apple-blue/25 flex h-12 w-12 items-center justify-center rounded-full p-3">{imageElement}</div>
                <div>
                    <p className={twMerge(clsx('text-apple-label-primary text-lg font-semibold', nameClassName))}>{name}</p>
                    <div className="flex">
                        {Array.from({ length: 5 }).map((_, index) => {
                            if (rating >= index + 1) {
                                return <Star key={index} size={16} className="text-apple-yellow fill-apple-yellow" />;
                            } else if (rating > index && rating < index + 1) {
                                return (
                                    <div className="relative w-4">
                                        <StarHalf key={'half_' + index} size={16} className="text-apple-yellow fill-apple-yellow absolute top-0 left-0 z-[2]" />
                                        <Star key={'other_half_' + index} size={16} className="text-apple-label-tertiary absolute top-0 left-0" />
                                    </div>
                                );
                            } else {
                                return <Star key={index} size={16} className="text-apple-label-tertiary" />;
                            }
                        })}
                    </div>
                </div>
            </div>
            {testimonial && <p className={twMerge(clsx('text-apple-label-secondary line-clamp-6 font-light italic', testimonialClassName))}>"{testimonial}"</p>}
        </CardContainer>
    );
};

export default TestimonialCard;
