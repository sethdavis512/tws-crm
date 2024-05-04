import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    id: string;
    name: string;
}

export function Select({ children, id, name }: SelectProps) {
    return (
        <select id={id} name={name} className="dark:bg-zinc-800 rounded-md">
            {children}
        </select>
    );
}
