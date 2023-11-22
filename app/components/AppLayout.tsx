import { type ReactNode } from 'react';
import { Outlet } from '@remix-run/react';

import AppList from './AppList';
import AppDetails from './AppDetails';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <>
            <AppList>{children}</AppList>
            <AppDetails>
                <Outlet />
            </AppDetails>
        </>
    );
}
