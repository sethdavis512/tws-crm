import type { InputHTMLAttributes } from 'react';
import { cn } from '~/utils/css';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
}

export function Checkbox({
    className,
    defaultChecked = false,
    id,
    ...rest
}: CheckboxProps) {
    const checkboxClassName = cn(
        'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600',
        className
    );

    return (
        <input
            id={id}
            type="checkbox"
            defaultChecked={defaultChecked}
            className={checkboxClassName}
            {...rest}
        />
    );
}
