import type { ReactNode } from 'react';
import { Children, cloneElement, isValidElement } from 'react';
import { useTabsContextData } from './Tabs';

interface TabsListProps {
    children: ReactNode;
}

interface EnrichedChild {
    active: boolean;
    currentTab: number;
    handleSetCurrentTab: (e: React.MouseEvent<HTMLButtonElement>) => void;
    index: number;
}

export default function TabsList({ children }: TabsListProps) {
    const { currentTab, setCurrentTab } = useTabsContextData();

    const handleSetCurrentTab = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setCurrentTab(Number(event.currentTarget.dataset.tabIndex));
    };

    const mappedChildren = Children.map(children, (childElement, index) => {
        if (!isValidElement<EnrichedChild>(childElement)) {
            return childElement;
        }

        return cloneElement(childElement, {
            active: index === currentTab,
            currentTab,
            handleSetCurrentTab,
            index
        });
    });

    return (
        <ul className="flex gap-2 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {mappedChildren}
        </ul>
    );
}
