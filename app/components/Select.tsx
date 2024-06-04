import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    id: string;
    name: string;
}

export function Select({ children, id, name }: SelectProps) {
    return (
        <select id={id} name={name} className="rounded-md dark:bg-zinc-900">
            {children}
        </select>
    );
}
