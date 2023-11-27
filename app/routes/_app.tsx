import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { requireUserId } from '~/utils/auth.server';
import { Grid } from '~/components/Grid';
import { LeftNav } from '~/components/LeftNav';
import { BORDER_RIGHT_COLORS } from '~/utils/constants';

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request);

    return null;
}

export default function AppRoute() {
    return (
        <Grid className="col-span-full min-h-full">
            <div className={`col-span-2 ${BORDER_RIGHT_COLORS}`}>
                <LeftNav />
            </div>
            <Outlet />
        </Grid>
    );
}
