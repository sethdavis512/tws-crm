import { type ReactNode } from 'react';

interface DrawerProps {
    children: ReactNode;
}

export function Drawer({ children }: DrawerProps) {
    return (
        <div
            id="drawer-right-example"
            className="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800"
            tabIndex={-1}
            aria-labelledby="drawer-right-label"
        >
            {children}
        </div>
    );
}
