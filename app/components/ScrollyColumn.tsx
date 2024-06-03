import { type ReactNode } from 'react';
import { cx } from 'cva.config';

interface ScrollyColumnProps {
    children: ReactNode;
    as?: React.ElementType;
    className?: string;
    size?: number;
}

export function ScrollyColumn({
    as = 'div',
    children,
    className,
    size = 10
}: ScrollyColumnProps) {
    const Component = as;
    const scrollyColumnClassName = cx(
        `col-span-${size} overflow-y-auto`,
        className
    );

    return <Component className={scrollyColumnClassName}>{children}</Component>;
}
