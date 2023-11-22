import React, { type ReactNode } from 'react';

interface SelectProps {
    children: ReactNode;
    name: string;
}

export default function Select({ children, name }: SelectProps) {
    return (
        <select name={name} className="dark:bg-gray-800 rounded-md">
            {children}
        </select>
    );
}
