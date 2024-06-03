import { Outlet } from '@remix-run/react';
import { Heading } from '~/components/Heading';
import { LeftNav } from '~/components/LeftNav';
import { BORDER_BOTTOM_COLORS, BORDER_LEFT_COLORS } from '~/utils/constants';

export default function CompaniesRoute() {
    // div className="grid grid-cols-subgrid gap-4 col-span-full"

    return (
        <>
            <div className="col-span-full sm:col-span-2">
                <LeftNav />
            </div>
            <div
                className={`col-span-full sm:col-span-10 overflow-y-auto ${BORDER_LEFT_COLORS}`}
            >
                <header
                    className={`sticky top-0 left-0 wg-bg-wg-white dark:wg-bg-wg-gray-900`}
                >
                    <div
                        className={`p-4 flex items-center justify-between ${BORDER_BOTTOM_COLORS}`}
                    >
                        <Heading as="h2">Companies</Heading>
                    </div>
                </header>
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
