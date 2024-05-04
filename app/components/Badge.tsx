import * as React from 'react';
import { cva } from 'class-variance-authority';

import type { RequiredVariantProps } from '~/types';
import { cn } from '~/utils/css';

type BadgeVariants = RequiredVariantProps<typeof badgeVariants>;

type BadgeProps = Partial<BadgeVariants> &
    React.AllHTMLAttributes<HTMLDivElement>;

const badgeVariants = cva(
    'rounded-full text-xs px-2 py-1 text-white inline-block',
    {
        variants: {
            variant: {
                primary: 'bg-emerald-500',
                secondary: 'bg-amber-500',
                tertiary: 'bg-red-500'
            }
        },
        defaultVariants: {
            variant: 'primary'
        }
    }
);

export function Badge({ children, className, variant, ...rest }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ className, variant }))} {...rest}>
            {children}
        </div>
    );
}
