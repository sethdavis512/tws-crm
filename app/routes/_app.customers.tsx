import { Button } from '@lemonsqueezy/wedges';
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { Link, NavLink, Outlet, useLoaderData } from '@remix-run/react';
import { cx } from 'cva.config';
import { UsersIcon } from 'lucide-react';
import invariant from 'tiny-invariant';
import Flex from '~/components/Flex';
import Heading from '~/components/Heading';

import { LeftNav } from '~/components/LeftNav';
import ScrollColumn from '~/components/ScrollColumn';
import {
    BACKGROUND_HOVER_ACTIVE_COLORS,
    BACKGROUND_HOVER_COLORS,
    BORDER_COLORS,
    BORDER_LEFT_COLORS,
} from '~/constants';
import { getSupabaseWithHeaders } from '~/utils/supabase.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = await getSupabaseWithHeaders({ request });
    const response = await supabase.from('customer').select('*');
    invariant(response, 'Supabase encountered an error');

    return json({ customers: response.data || [] });
}

export default function CustomersRoute() {
    const { customers } = useLoaderData<typeof loader>();

    return (
        <>
            <ScrollColumn className={`md:col-span-2`}>
                <LeftNav />
            </ScrollColumn>
            <ScrollColumn
                header={
                    <Heading size="4">{`Customers (${customers.length})`}</Heading>
                }
                className={`md:col-span-2 ${BORDER_LEFT_COLORS}`}
            >
                <ul className="space-y-2">
                    {customers && customers.length > 0 ? (
                        customers.map((company) => (
                            <li key={company.id}>
                                <NavLink
                                    to={company.id}
                                    className={({ isActive }) =>
                                        cx(
                                            'block rounded-lg px-4 py-2',
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
                                <UsersIcon />
                            </div>
                            <p className={`text-2xl text-zinc-500`}>
                                No customers found
                            </p>
                            <Button asChild>
                                <Link to="create">Create a customer</Link>
                            </Button>
                        </Flex>
                    )}
                </ul>
            </ScrollColumn>
            <Outlet />
        </>
    );
}
