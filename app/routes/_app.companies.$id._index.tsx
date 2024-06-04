import { type LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Heading from '~/components/Heading';
import { getSupabaseWithHeaders } from '~/utils/supabase.server';

export async function loader({ request, params }: LoaderFunctionArgs) {
    const { supabase } = await getSupabaseWithHeaders({ request });
    const response = await supabase
        .from('company')
        .select('*')
        .eq('id', params.id!);

    const company = response?.data?.shift();

    return json({ company });
}

export default function CompanyDetailsIndexRoute() {
    const { company } = useLoaderData<typeof loader>();

    return (
        <>
            <Heading size="4">{company?.name}</Heading>
        </>
    );
}
