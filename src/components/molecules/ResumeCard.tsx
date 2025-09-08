import React from 'react';
import CardContainer from '../atoms/CardContainer';
import clsx from 'clsx';

interface ResumeCardProps {
    title: string; // Name of school or company
    startYear: number;
    endYear?: number; // If undefined, treat as current
    gpa?: string;
    records: string[] | React.ReactNode;
    cardClassName?: string;
    isLast?: boolean;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ title, startYear, endYear, gpa, records, cardClassName, isLast = false }) => {
    const currentYear = new Date().getFullYear();
    const isCurrent = !endYear || endYear >= currentYear;

    return (
        <div className={clsx('flex gap-4', isLast && 'overflow-hidden')}>
            <div className="relative w-4">
                <div className={clsx('absolute top-1 left-0 z-[3] h-4 w-4 rounded-full', isCurrent ? 'bg-apple-blue' : 'bg-apple-gray3')}></div>
                {isCurrent && <div className="bg-apple-blue absolute top-1 left-0 h-4 w-4 animate-ping rounded-full"></div>}
                <div className="bg-apple-gray3 absolute top-1 left-[50%] z-[2] h-full w-[1px] -translate-x-[50%]"></div>
            </div>

            <CardContainer className={clsx('gap-2 p-6', cardClassName, !isLast && 'mb-8')} isHorizontal={false}>
                <div>
                    <h4 className="text-apple-label-primary text-lg font-semibold">{title}</h4>
                    <div className="flex items-center justify-between gap-4 sm:justify-start">
                        <p className="text-apple-blue text-sm font-medium">
                            {startYear} - {isCurrent ? 'Present' : endYear}
                        </p>
                        {gpa && (
                            <div className="flex items-center gap-1">
                                <p className="text-apple-label-tertiary text-xs">GPA:</p>
                                <p className="text-apple-blue text-sm font-medium">{gpa}</p>
                            </div>
                        )}
                    </div>
                </div>

                {Array.isArray(records) && records.every(r => typeof r === 'string') ? (
                    <ul className="text-apple-label-secondary ml-0.5 list-disc pl-4">
                        {records.map((record, i) => (
                            <li key={i}>{record}</li>
                        ))}
                    </ul>
                ) : (
                    records
                )}
            </CardContainer>
        </div>
    );
};

export default ResumeCard;
