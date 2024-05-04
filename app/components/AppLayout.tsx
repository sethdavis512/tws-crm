import { type ReactNode } from 'react';
import { Outlet } from '@remix-run/react';

import { BORDER_RIGHT_COLORS } from '~/utils/constants';

interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <>
            <div
                className={`col-span-3 ${BORDER_RIGHT_COLORS} overflow-y-auto`}
            >
                {children}
            </div>
            <div className="col-span-7 overflow-y-auto">
                <Outlet />
            </div>
        </>
    );
}
