import clsx from 'clsx';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { type ReactNode } from 'react';

import { useToggle } from '~/hooks/useToggle';

interface FoldableListProps {
    children: ReactNode;
    icon: ReactNode;
    text: string;
}

export function FoldableList({ children, icon, text }: FoldableListProps) {
    const [isOpen, toggleIsOpen] = useToggle();

    return (
        <>
            <button
                type="button"
                className="flex items-center p-2 w-full text-base font-medium text-zinc-900 rounded-lg transition duration-75 group hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
                onClick={toggleIsOpen}
            >
                <div>{icon}</div>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    {text}
                </span>
                {isOpen ? (
                    <ChevronDown className="w-5 h-5" />
                ) : (
                    <ChevronRight className="w-5 h-5" />
                )}
            </button>
            <ul className={clsx(!isOpen && 'hidden')}>{children}</ul>
        </>
    );
}
