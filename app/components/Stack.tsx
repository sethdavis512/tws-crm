import { type ReactNode } from 'react';

interface StackProps {
    children: ReactNode;
    vertical?: boolean;
    gap?: 2 | 4;
}

export function Stack({ children, gap = 2, vertical }: StackProps) {
    return (
        <div className={`flex gap-${gap} ${vertical ? 'flex-col' : ''}`}>
            {children}
        </div>
    );
}
