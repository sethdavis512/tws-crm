import { cva } from 'class-variance-authority';
import type { RequiredVariantProps } from '~/types';

type SeparatorVariants = RequiredVariantProps<typeof separatorVariants>;

// TODO: Check types on this one
type SeparatorProps = Partial<SeparatorVariants> &
    React.HTMLAttributes<HTMLBaseElement>;

const separatorVariants = cva('h-px bg-gray-200 border-0 dark:bg-gray-700', {
    variants: {
        spacing: {
            sm: 'my-2',
            md: 'my-4',
            lg: 'my-8'
        }
    },
    defaultVariants: {
        spacing: 'md'
    }
});

export function Separator({ className, spacing }: SeparatorProps) {
    return <hr className={separatorVariants({ className, spacing })} />;
}
