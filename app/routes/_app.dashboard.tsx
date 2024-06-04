import { Outlet } from '@remix-run/react';
import { Heading } from '~/components/Heading';
import { LeftNav } from '~/components/LeftNav';
import ScrollColumn from '~/components/ScrollColumn';
import { BORDER_LEFT_COLORS } from '~/constants';

export default function DashboardRoute() {
    return (
        <>
            <ScrollColumn className={`md:col-span-2`}>
                <LeftNav />
            </ScrollColumn>
            <ScrollColumn
                className={`sm:col-span-10 ${BORDER_LEFT_COLORS}`}
                header={<Heading>Dashboard</Heading>}
            >
                <Outlet />
            </ScrollColumn>
        </>
    );
}
