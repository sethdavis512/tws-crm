import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getPanelLinkClassName(isActive: boolean): string {
    return cn(
        'block p-4 bg-white border-b border-b-zinc-200 dark:border-b-zinc-700 dark:bg-zinc-800',
        isActive && 'bg-zinc-200 dark:bg-cyan-600'
    );
}
