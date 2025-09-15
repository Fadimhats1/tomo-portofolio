import clsx from 'clsx';
import { motion, type HTMLMotionProps } from 'motion/react';
import { twMerge } from 'tailwind-merge';

interface InputTextProps extends HTMLMotionProps<'input'> {
    id: string;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    wrapperProps?: HTMLMotionProps<'label'>;
}

const InputText: React.FC<InputTextProps> = ({ id, leftElement, rightElement, value, onChange, className, wrapperProps = {}, ...rest }) => {
    return (
        <motion.label
            {...wrapperProps}
            htmlFor={id}
            className={twMerge(
                clsx(
                    'bg-apple-gray4 focus-within:ring-apple-blue flex cursor-text items-center gap-3 rounded-xl px-3 py-2 focus-within:ring-2',
                    wrapperProps.className
                )
            )}
        >
            {leftElement}

            <motion.input
                {...rest}
                type={rest.type || 'text'}
                id={id}
                className={twMerge(clsx('text-apple-label-primary placeholder-apple-label-secondary flex-1 bg-transparent outline-none', className))}
                value={value}
                onChange={onChange}
            />

            {rightElement}
        </motion.label>
    );
};

export default InputText;
