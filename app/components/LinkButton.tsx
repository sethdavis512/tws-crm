import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/utils/css';
import { Link } from '@remix-run/react';

const linkButtonVariants = cva(
    'rounded-md text-white focus:ring-4 focus:ring-blue-300 font-medium text-sm focus:outline-none dark:focus:ring-blue-800',
    {
        variants: {
            variant: {
                default:
                    'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700',
                danger: 'bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700'
            },
            size: {
                default: 'px-5 py-2.5',
                large: '',
                small: '',
                tiny: 'px-2 py-1'
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
        VariantProps<typeof linkButtonVariants> {
    to: string;
}

const LinkButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, className, variant, size, to }) => {
        return (
            <Link
                className={cn(linkButtonVariants({ variant, size, className }))}
                to={to}
            >
                {children}
            </Link>
        );
    }
);

LinkButton.displayName = 'LinkButton';

export { LinkButton, linkButtonVariants };
