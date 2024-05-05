import { type ReactNode } from 'react';
import { cn } from '~/utils/css';

interface ScrollyColumnProps {
    children: ReactNode;
    as?: React.ElementType;
    className?: string;
    size?: number;
}

export function ScrollyColumn({
    as = 'main',
    children,
    className,
    size = 10
}: ScrollyColumnProps) {
    const Component = as;
    const scrollyColumnClassName = cn(
        `col-span-${size} overflow-y-auto`,
        className
    );

    return <Component className={scrollyColumnClassName}>{children}</Component>;
}
