import * as React from 'react';
import { cva, cx } from '../../cva.config';

import type { RequiredVariantProps } from '~/types';

type BadgeVariants = RequiredVariantProps<typeof badgeVariants>;

type BadgeProps = Partial<BadgeVariants> &
    React.AllHTMLAttributes<HTMLDivElement>;

const badgeVariants = cva({
    variants: {
        variant: {
            primary: 'bg-primary-700 dark:bg-primary-700',
            secondary: 'bg-amber-500 dark:bg-amber-50',
            tertiary: 'bg-red-500 dark:bg-red-500',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
});

export function Badge({ children, className, variant, ...rest }: BadgeProps) {
    return (
        <div
            className={cx(
                'inline-block rounded-full px-2 py-1 text-xs text-white',
                badgeVariants({ className, variant })
            )}
            {...rest}
        >
            {children}
        </div>
    );
}
