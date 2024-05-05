import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { requireUserId } from '~/utils/auth.server';
import { LeftNav } from '~/components/LeftNav';
import { BORDER_RIGHT_COLORS } from '~/utils/constants';

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request);

    return null;
}

export default function AppRoute() {
    return (
        <>
            <aside className={`col-span-2 ${BORDER_RIGHT_COLORS}`}>
                <LeftNav />
            </aside>
            <Outlet />
        </>
    );
}
