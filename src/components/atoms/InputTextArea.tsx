import clsx from 'clsx';
import { motion, type HTMLMotionProps } from 'motion/react';
import { twMerge } from 'tailwind-merge';

interface InputTextAreaProps extends HTMLMotionProps<'textarea'> {
    id: string;
    wrapperProps?: HTMLMotionProps<'label'>;
}

const InputTextArea: React.FC<InputTextAreaProps> = ({ id, value, onChange, className, wrapperProps, ...rest }) => {
    return (
        <motion.label
            {...wrapperProps}
            htmlFor={id}
            className={twMerge(
                clsx(
                    'bg-apple-gray4 focus-within:ring-apple-blue flex cursor-text items-center gap-3 rounded-xl px-3 py-2 focus-within:ring-2',
                    wrapperProps?.className
                )
            )}
        >
            <motion.textarea
                {...rest}
                id={id}
                className={twMerge(
                    clsx('text-apple-label-primary placeholder-apple-label-secondary flex-1 resize-none bg-transparent outline-none', className)
                )}
                rows={6}
                value={value}
                onChange={onChange}
            ></motion.textarea>
        </motion.label>
    );
};

export default InputTextArea;
