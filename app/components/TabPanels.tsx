import { Children, type ReactNode } from 'react';
import { useTabsContextData } from './Tabs';

interface TabPanelsProps {
    children: ReactNode;
}

export default function TabPanels({ children }: TabPanelsProps) {
    const { currentTab } = useTabsContextData();

    const childrenArr = Children.toArray(children).reduce((acc, cur, index) => {
        // @ts-ignore
        acc[index] = cur;

        return acc;
    }, {});

    // @ts-ignore
    return <div className="mb-4">{childrenArr[currentTab]}</div>;
}
