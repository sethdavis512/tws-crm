import { Outlet } from '@remix-run/react';
import { LeftNav } from '~/components/LeftNav';
import { BORDER_LEFT_COLORS } from '~/utils/constants';

export default function CompanyDetailRoute() {
    return (
        <>
            <div className="col-span-full sm:col-span-2">
                <LeftNav />
            </div>
            <div
                className={`col-span-full sm:col-span-10 overflow-y-auto ${BORDER_LEFT_COLORS}`}
            >
                <Outlet />
            </div>
        </>
    );
}
