import { type ReactNode } from 'react';
import { cva, cx } from 'cva.config';
import { BORDER_BOTTOM_COLORS } from '~/constants';

interface HeadingProps {
    children: ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
    id?: string;
    size?: '1' | '2' | '3' | '4' | '5' | '6';
    borderBottom?: boolean;
}

const headingVariants = cva({
    variants: {
        size: {
            '1': 'text-4xl md:text-5xl',
            '2': 'text-3xl md:text-4xl',
            '3': 'text-2xl md:text-3xl',
            '4': 'text-xl md:text-2xl',
            '5': 'text-lg md:text-xl',
            '6': 'text-md md:text-lg',
        },
        borderBottom: {
            true: `pb-2 ${BORDER_BOTTOM_COLORS}`,
        },
    },
    defaultVariants: {
        size: '2',
        borderBottom: false,
    },
});

export default function Heading({
    as = 'h2',
    children,
    className,
    id,
    size = '2',
    borderBottom,
}: HeadingProps) {
    const Component = as;

    return (
        <Component
            id={id}
            className={cx(
                'font-bold text-zinc-700 dark:text-white',
                headingVariants({ className, size, borderBottom })
            )}
        >
            {children}
        </Component>
    );
}
