import { type ReactNode } from 'react';

interface TabPanelProps {
    children: ReactNode;
}

export function TabPanel({ children }: TabPanelProps) {
    return <div className="p-4">{children}</div>;
}
