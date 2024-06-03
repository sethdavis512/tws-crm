import { type ReactNode } from 'react';
import { cx } from 'cva.config';

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export default function Container({ children, className }: ContainerProps) {
    return (
        <div className={cx('container mx-auto px-2', className)}>
            {children}
        </div>
    );
}
