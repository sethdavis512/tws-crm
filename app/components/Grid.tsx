import { type ReactNode } from 'react';
import { cx } from 'cva.config';

interface GridProps {
    children: ReactNode;
    as?: React.ElementType;
    className?: string;
    subgrid?: boolean;
}

export function Grid({ as = 'div', children, className, subgrid }: GridProps) {
    const Component = as;

    const gridClassName = cx(
        `grid grid-cols-12`,
        { 'grid-cols-subgrid': subgrid },
        className
    );

    return <Component className={gridClassName}>{children}</Component>;
}
