import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    wrapperClassName?: string;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
}

const InputText: React.FC<InputTextProps> = ({ id, wrapperClassName, leftElement, rightElement, value, onChange, className, ...rest }) => {
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
            {leftElement}

            <input
                type="text"
                id={id}
                className={twMerge(clsx('text-apple-label-primary placeholder-apple-label-secondary flex-1 bg-transparent outline-none', className))}
                value={value}
                onChange={onChange}
                {...rest}
            />

            {rightElement}
        </label>
    );
};

export default InputText;
