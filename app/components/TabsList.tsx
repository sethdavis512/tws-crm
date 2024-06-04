import type { ReactNode } from 'react';
import { Children, cloneElement, isValidElement } from 'react';
import { useTabsContextData } from './Tabs';
import { BORDER_BOTTOM_COLORS } from '~/constants';

interface TabsListProps {
    children: ReactNode;
}

interface EnrichedChild {
    active: boolean;
    currentTab: number;
    handleSetCurrentTab: (e: React.MouseEvent<HTMLButtonElement>) => void;
    index: number;
}

export function TabsList({ children }: TabsListProps) {
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
            index,
        });
    });

    return (
        <ul
            className={`flex gap-2 text-center text-sm font-medium text-zinc-500 dark:text-zinc-400 ${BORDER_BOTTOM_COLORS}`}
        >
            {mappedChildren}
        </ul>
    );
}
