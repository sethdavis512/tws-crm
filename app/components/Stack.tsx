import { type ReactNode } from 'react';
import { cn } from '~/utils/css';

interface StackProps {
    children: ReactNode;
    centeredVertically?: boolean;
    vertical?: boolean;
    gap?: 2 | 4;
    className?: string;
}

export function Stack({
    centeredVertically = true,
    children,
    gap = 2,
    vertical,
    className
}: StackProps) {
    const stackClassName = cn(
        `flex gap-${gap}`,
        {
            'items-center': centeredVertically,
            'flex-col': vertical
        },
        className
    );

    return <div className={stackClassName}>{children}</div>;
}
