import { type ReactNode } from 'react';

interface StackProps {
    children: ReactNode;
    vertical?: boolean;
    gap?: 2 | 4;
    className?: string;
}

export function Stack({ children, gap = 2, vertical, className }: StackProps) {
    return (
        <div
            className={`flex gap-${gap} ${
                vertical ? 'flex-col' : ''
            } ${className}`}
        >
            {children}
        </div>
    );
}
