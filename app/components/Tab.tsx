import { cn } from '~/utils/css';

interface TabProps {
    text: string;
    active?: boolean;
    index?: number;
    handleSetCurrentTab?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Tab({
    text,
    active,
    handleSetCurrentTab,
    index
}: TabProps) {
    const buttonClassName = cn(
        'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-300',
        active && 'bg-gray-200 dark:bg-gray-600'
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
