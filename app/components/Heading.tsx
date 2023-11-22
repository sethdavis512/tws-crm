import { cva } from 'class-variance-authority';
import { type ReactNode } from 'react';
import { cn } from '~/utils/css';

interface HeadingProps {
    children: ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
    size?: '1' | '2' | '3' | '4' | '5' | '6';
}

const headingVariants = cva('font-bold', {
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

export default function Heading({
    as = 'h2',
    children,
    className,
    size = '2'
}: HeadingProps) {
    const Component = as;

    return (
        <Component className={cn(headingVariants({ className, size }))}>
            {children}
        </Component>
    );
}
