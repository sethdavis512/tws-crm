import { Button, Input } from '@lemonsqueezy/wedges';
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { Link, NavLink, Outlet, useLoaderData } from '@remix-run/react';
import { cx } from 'cva.config';
import { BuildingIcon } from 'lucide-react';
import { type BaseSyntheticEvent, useState } from 'react';
import invariant from 'tiny-invariant';
import Flex from '~/components/Flex';
import Heading from '~/components/Heading';

import { LeftNav } from '~/components/LeftNav';
import ScrollColumn from '~/components/ScrollColumn';
import {
    BACKGROUND_COLORS,
    BACKGROUND_HOVER_ACTIVE_COLORS,
    BACKGROUND_HOVER_COLORS,
    BORDER_BOTTOM_COLORS,
    BORDER_COLORS,
    BORDER_LEFT_COLORS,
} from '~/constants';
import { getSupabaseWithHeaders } from '~/utils/supabase.server';

interface CustomerShape {
    created_at: string;
    id: string;
    name: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = await getSupabaseWithHeaders({ request });
    const response = await supabase
        .from('company')
        .select('*')
        .order('name', { ascending: true });
    invariant(response, 'Supabase encountered an error');

    return json({ companies: response.data || [] });
}

export default function CompaniesRoute() {
    const [search, setSearch] = useState('');
    const { companies } = useLoaderData<typeof loader>();
    const filteredCompanies = companies.reduce<CustomerShape[]>((acc, cur) => {
        if (
            cur.name.toLowerCase().trim().includes(search.toLowerCase().trim())
        ) {
            acc.push(cur);
        }

        return acc;
    }, []);

    return (
        <div className="col-span-full grid auto-rows-min grid-cols-subgrid md:auto-rows-fr">
            <ScrollColumn className={`row-auto hidden md:col-span-2 md:block`}>
                <LeftNav />
            </ScrollColumn>
            <ScrollColumn
                header={
                    <Heading size="4">{`Companies (${filteredCompanies.length})`}</Heading>
                }
                className={`md:col-span-2 ${BORDER_LEFT_COLORS}`}
            >
                {/* <div
                    className={`sticky top-[65px] -m-4 p-4 ${BACKGROUND_COLORS} ${BORDER_BOTTOM_COLORS}`}
                >
                    <Input
                        label="Search"
                        onChange={(event: BaseSyntheticEvent) => {
                            setSearch(event?.currentTarget.value);
                        }}
                        value={search}
                    />
                </div> */}
                {/* pt-8 */}
                <ul className="space-y-2">
                    {companies && companies.length > 0 ? (
                        filteredCompanies.map((company) => (
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
                                <BuildingIcon />
                            </div>
                            <p className={`text-2xl text-zinc-500`}>
                                No companies found
                            </p>
                            <Button asChild>
                                <Link to="create">Create a company</Link>
                            </Button>
                        </Flex>
                    )}
                </ul>
            </ScrollColumn>
            <Outlet />
        </div>
    );
}
