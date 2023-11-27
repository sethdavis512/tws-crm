import { type ReactNode } from 'react';
import { cn } from '~/utils/css';

interface GridProps {
    children: ReactNode;
    as?: React.ElementType;
    className?: string;
}

export function Grid({ as = 'div', children, className }: GridProps) {
    const Component = as;
    const gridClassName = cn('grid grid-cols-12', className);

    return <Component className={gridClassName}>{children}</Component>;
}
