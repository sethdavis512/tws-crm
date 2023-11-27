import * as React from 'react';
import type { LinkProps } from '@remix-run/react';
import { Link } from '@remix-run/react';
import type { RequiredVariantProps } from '~/types';

import { cn } from '~/utils/css';
import { buttonVariants } from './Button';

type LinkButtonVariants = RequiredVariantProps<typeof buttonVariants>;

type LinkButtonProps = Partial<LinkButtonVariants> &
    React.ButtonHTMLAttributes<HTMLButtonElement> &
    LinkProps;

const linkButtonVariants = buttonVariants;

export function LinkButton({
    children,
    className,
    variant,
    size,
    to
}: LinkButtonProps) {
    return (
        <Link
            className={cn(linkButtonVariants({ variant, size, className }))}
            to={to}
        >
            {children}
        </Link>
    );
}
