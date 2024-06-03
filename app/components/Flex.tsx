import { type HTMLAttributes, type ReactNode } from 'react';
import { cx } from 'cva.config';

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

export default function Flex({ children, className, ...rest }: FlexProps) {
    return (
        <div className={cx('flex items-center gap-2', className)} {...rest}>
            {children}
        </div>
    );
}
