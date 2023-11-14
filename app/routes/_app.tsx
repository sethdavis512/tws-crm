import { Outlet } from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/node';

import { requireUserId } from '~/utils/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request);

    return null;
}

export default function AppRoute() {
    return <Outlet />;
}
