import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ACTIVE_BG_COLOR } from './constants';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getPanelLinkClassName(isActive: boolean): string {
    return cn(
        'block p-4 m-2 rounded-xl bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800',
        isActive && ACTIVE_BG_COLOR
    );
}
