import { type LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, json } from '@remix-run/react';
import { Heading } from '~/components/Heading';
import { BORDER_BOTTOM_COLORS, BORDER_LEFT_COLORS } from '~/utils/constants';
import { getSupabaseWithHeaders } from '~/utils/supabase.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = await getSupabaseWithHeaders({ request });
    const response = await supabase.from('company').select('*');

    return json({
        companies: response.data,
    });
}

export default function CompanyDetailRoute() {
    return (
        <div
            className={`col-span-full overflow-y-auto sm:col-span-8 ${BORDER_LEFT_COLORS}`}
        >
            <header
                className={`sticky left-0 top-0 wg-bg-wg-white dark:wg-bg-wg-gray-900`}
            >
                <div
                    className={`flex items-center justify-between p-4 ${BORDER_BOTTOM_COLORS}`}
                >
                    <Heading>Details</Heading>
                </div>
            </header>
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    );
}
