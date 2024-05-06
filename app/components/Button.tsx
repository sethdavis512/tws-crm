import * as React from 'react';
import { cva } from 'class-variance-authority';
import type { RequiredVariantProps } from '~/types';

type ButtonVariants = RequiredVariantProps<typeof buttonVariants>;

type ButtonProps = Partial<ButtonVariants> &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

export const buttonVariants = cva('font-bold shadow-sm rounded-md', {
    variants: {
        variant: {
            primary:
                'bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700',
            secondary:
                'bg-white text-zinc-900 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 active:bg-zinc-100',
            danger: 'bg-red-500 text-white ring-1 ring-inset ring-red-300 dark:ring-red-800 hover:bg-red-50 dark:hover:bg-red-700 active:bg-red-100',
            warning:
                'bg-amber-500 text-white ring-1 ring-inset ring-amber-300 dark:ring-amber-800 hover:bg-amber-50 dark:hover:bg-amber-700 active:bg-amber-100',
            success:
                'bg-green-500 text-white ring-1 ring-inset ring-green-300 dark:ring-green-800 hover:bg-green-50 dark:hover:bg-green-700 active:bg-green-100'
        },
        size: {
            xs: 'text-xs px-2 py-1',
            sm: 'text-sm px-2 py-1',
            md: 'text-sm px-3 py-2',
            lg: 'text-md px-3 py-2',
            xl: 'text-md px-3 py-2'
        }
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md'
    }
});

export function Button({
    variant,
    size,
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={buttonVariants({
                className,
                variant,
                size
            })}
            {...props}
        >
            {children}
        </button>
    );
}
