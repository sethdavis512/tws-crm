import { type ReactNode } from 'react';
import { cva, cx } from 'cva.config';

interface HeadingProps {
    children: ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
    id?: string;
    size?: '1' | '2' | '3' | '4' | '5' | '6';
}

const headingVariants = cva({
    variants: {
        size: {
            '1': 'text-4xl',
            '2': 'text-2xl',
            '3': 'text-xl',
            '4': 'text-lg',
            '5': 'text-md',
            '6': 'text-sm'
        }
    },
    defaultVariants: {
        size: '2'
    }
});

export function Heading({
    as = 'h2',
    children,
    className,
    id,
    size = '2'
}: HeadingProps) {
    const Component = as;

    return (
        <Component
            id={id}
            className={cx('font-bold', headingVariants({ className, size }))}
        >
            {children}
        </Component>
    );
}
