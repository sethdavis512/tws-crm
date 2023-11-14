import { type ReactNode } from 'react';
import { cn } from '~/utils/css';

interface LabelProps {
    children: ReactNode;
    htmlFor: string;
    className?: string;
}

const Label = ({ children, htmlFor, className }: LabelProps) => {
    const labelClassName = cn(
        'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
        className
    );

    return (
        <label htmlFor={htmlFor} className={labelClassName}>
            {children}
        </label>
    );
};

export { Label };
