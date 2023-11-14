import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/utils/css';

const badgeVariants = cva(
    'rounded-full text-xs px-2 py-1 text-white inline-block',
    {
        variants: {
            variant: {
                primary: 'bg-green-500',
                secondary: 'bg-amber-500',
                tertiary: 'bg-red-500'
            }
        },
        defaultVariants: {
            variant: 'primary'
        }
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ children, className, variant, ...props }, ref) => {
        return (
            <div
                className={cn(badgeVariants({ className, variant }))}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
