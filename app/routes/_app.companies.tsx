import { Button } from '@lemonsqueezy/wedges';
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { Link, NavLink, Outlet, useLoaderData } from '@remix-run/react';
import { cx } from 'cva.config';
import { BuildingIcon } from 'lucide-react';
import invariant from 'tiny-invariant';
import Flex from '~/components/Flex';

import { Heading } from '~/components/Heading';
import { LeftNav } from '~/components/LeftNav';
import {
    BACKGROUND_HOVER_ACTIVE_COLORS,
    BACKGROUND_HOVER_COLORS,
    BORDER_COLORS
} from '~/constants';
import { BORDER_BOTTOM_COLORS, BORDER_LEFT_COLORS } from '~/utils/constants';
import { getSupabaseWithHeaders } from '~/utils/supabase.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = await getSupabaseWithHeaders({ request });
    const response = await supabase.from('company').select('*');
    invariant(response, 'Supabase encountered an error');

    return json({ companies: response.data || [] });
}

export default function CompaniesRoute() {
    // div className="grid grid-cols-subgrid gap-4 col-span-full"
    const { companies } = useLoaderData<typeof loader>();

    return (
        <>
            <div className="col-span-full sm:col-span-2">
                <LeftNav />
            </div>
            <div
                className={`col-span-full sm:col-span-2 overflow-y-auto ${BORDER_LEFT_COLORS}`}
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
                    <ul className="space-y-2">
                        {companies && companies.length > 0 ? (
                            companies.map((company) => (
                                <li key={company.id}>
                                    <NavLink
                                        to={company.id}
                                        className={({ isActive }) =>
                                            cx(
                                                'block p-4 rounded-lg',
                                                isActive
                                                    ? BACKGROUND_HOVER_ACTIVE_COLORS
                                                    : BACKGROUND_HOVER_COLORS
                                            )
                                        }
                                    >
                                        {company.name}
                                    </NavLink>
                                </li>
                            ))
                        ) : (
                            <Flex
                                className={`flex-col gap-4 p-4 ${BORDER_COLORS} rounded-lg`}
                            >
                                <div>
                                    <BuildingIcon />
                                </div>
                                <p className={`text-2xl text-zinc-500`}>
                                    No companies found.{' '}
                                </p>
                                <Button asChild>
                                    <Link to="create">Create a company</Link>
                                </Button>
                            </Flex>
                        )}
                    </ul>
                </div>
            </div>
            <div
                className={`col-span-full sm:col-span-8 overflow-y-auto ${BORDER_LEFT_COLORS}`}
            >
                <header
                    className={`sticky top-0 left-0 wg-bg-wg-white dark:wg-bg-wg-gray-900`}
                >
                    <div
                        className={`p-4 flex items-center justify-between ${BORDER_BOTTOM_COLORS}`}
                    >
                        <Heading>Details</Heading>
                    </div>
                </header>
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
            {/* <Outlet /> */}
        </>
    );
}
