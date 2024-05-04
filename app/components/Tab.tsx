import { cn } from '~/utils/css';

interface TabProps {
    text: string;
    active?: boolean;
    index?: number;
    handleSetCurrentTab?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Tab({ text, active, handleSetCurrentTab, index }: TabProps) {
    const buttonClassName = cn(
        'inline-block p-4 rounded-t-lg hover:text-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-700 dark:hover:text-zinc-300',
        active && 'bg-zinc-200 dark:bg-zinc-600'
    );

    return (
        <button
            onClick={handleSetCurrentTab}
            data-tab-index={index}
            className={buttonClassName}
        >
            {text}
        </button>
    );
}
