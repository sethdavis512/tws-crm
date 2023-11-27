import * as React from 'react';
import { cva } from 'class-variance-authority';
import type { RequiredVariantProps } from '~/types';

type ButtonVariants = RequiredVariantProps<typeof buttonVariants>;

type ButtonProps = Partial<ButtonVariants> &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

export const buttonVariants = cva('font-semibold shadow-sm rounded-md', {
    variants: {
        variant: {
            primary:
                'bg-sky-700 text-white hover:bg-sky-800 active:bg-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700',
            secondary:
                'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 active:bg-gray-100',
            danger: 'bg-red-500 text-white ring-1 ring-inset ring-red-300 dark:ring-red-800 hover:bg-red-50 dark:hover:bg-red-700 active:bg-red-100'
        },
        size: {
            xs: 'text-xs px-2 py-1',
            sm: 'text-sm px-2 py-1',
            md: 'text-sm px-3 py-2',
            lg: 'text-sm px-3 py-2',
            xl: 'text-sm px-4 py-3'
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
