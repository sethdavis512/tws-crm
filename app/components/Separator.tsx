import { cn } from '~/utils/css';

interface SeparatorProps {
    className?: string;
}

export function Separator({ className }: SeparatorProps) {
    const separatorClassName = cn(
        'h-px my-8 bg-gray-200 border-0 dark:bg-gray-700',
        className
    );

    return <hr className={separatorClassName} />;
}
