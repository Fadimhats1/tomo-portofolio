import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputTextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    wrapperClassName?: string;
}

const InputTextArea: React.FC<InputTextAreaProps> = ({ id, wrapperClassName, value, onChange, className, ...rest }) => {
    return (
        <label
            htmlFor={id}
            className={twMerge(
                clsx(
                    'bg-apple-gray4 focus-within:ring-apple-blue flex cursor-text items-center gap-3 rounded-xl px-3 py-2 focus-within:ring-2',
                    wrapperClassName
                )
            )}
        >
            <textarea
                type="text"
                id={id}
                className={twMerge(
                    clsx('text-apple-label-primary placeholder-apple-label-secondary flex-1 resize-none bg-transparent outline-none', className)
                )}
                rows={6}
                value={value}
                onChange={onChange}
                {...rest}
            ></textarea>
        </label>
    );
};

export default InputTextArea;
