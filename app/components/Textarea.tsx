import React, { forwardRef } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '~/utils/css';

const textareaVariants = cva(
    'bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    {
        variants: {
            variant: {
                default: '',
                primary: ''
            },
            size: {
                default: ''
            },
            fullwidth: {
                true: 'w-full'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
);

export interface TextareaProps
    extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
        VariantProps<typeof textareaVariants> {}

const Textarea = forwardRef<HTMLInputElement, TextareaProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <textarea
                className={cn(textareaVariants({ variant, size, className }))}
                // ref={ref}
                rows={10}
                {...props}
            />
        );
    }
);

Textarea.displayName = 'Textarea';

export { Textarea };
