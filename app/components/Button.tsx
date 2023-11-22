import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/utils/css';

const buttonVariants = cva(
    'rounded-md text-white focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 focus:outline-none dark:focus:ring-blue-800',
    {
        variants: {
            variant: {
                default:
                    'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700',
                danger: 'bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700'
            },
            size: {
                default: '',
                large: '',
                small: '',
                tiny: ''
            },
            outlined: {
                true: ''
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, type, ...props }, ref) => {
        return (
            <button
                type={type}
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
