import { type ReactNode } from 'react';
import { ScrollyColumn } from './ScrollyColumn';
import { ScrollyPanel } from './ScrollyPanel';
import { BORDER_LEFT_COLORS } from '~/utils/constants';
import { Outlet } from '@remix-run/react';

interface ParentLayoutProps {
    children: ReactNode;
    heading: string;
    aux?: ReactNode;
}

export default function ParentLayout({
    aux,
    children,
    heading
}: ParentLayoutProps) {
    return (
        <>
            <ScrollyColumn as="main" className="col-span-3">
                <ScrollyPanel heading={heading} aux={aux}>
                    {children}
                </ScrollyPanel>
            </ScrollyColumn>
            <ScrollyColumn
                as="aside"
                className={`col-span-7 ${BORDER_LEFT_COLORS}`}
            >
                <Outlet />
            </ScrollyColumn>
        </>
    );
}
