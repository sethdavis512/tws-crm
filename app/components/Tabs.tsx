import type { Dispatch, ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface TabsProps {
    children: ReactNode;
    initialTab?: number;
}

interface TabsContextDataResponse {
    currentTab: number;
    setCurrentTab: Dispatch<number>;
}

export const TabsContextData = createContext<
    TabsContextDataResponse | undefined
>(undefined);

export function useTabsContextData() {
    const context = useContext(TabsContextData);

    if (context === undefined) {
        throw new Error(
            'useTabsContextData must be used within a TabsContextDataProvider'
        );
    }

    return context;
}

export function Tabs({ children, initialTab = 0 }: TabsProps) {
    const [currentTab, setCurrentTab] = useState(initialTab);

    return (
        <TabsContextData.Provider value={{ currentTab, setCurrentTab }}>
            {children}
        </TabsContextData.Provider>
    );
}
