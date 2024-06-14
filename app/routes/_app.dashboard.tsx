import { Outlet } from '@remix-run/react';
import Heading from '~/components/Heading';
import { LeftNav } from '~/components/LeftNav';
import ScrollColumn from '~/components/ScrollColumn';
import { BORDER_LEFT_COLORS } from '~/constants';

export default function DashboardRoute() {
    return (
        <>
            <ScrollColumn className="hidden md:col-span-2 md:block">
                <LeftNav />
            </ScrollColumn>
            <ScrollColumn
                className={`sm:col-span-10 ${BORDER_LEFT_COLORS}`}
                containerClassName="pt-8"
                header={
                    <Heading as="h1" size="4">
                        Dashboard
                    </Heading>
                }
            >
                <Outlet />
            </ScrollColumn>
        </>
    );
}
