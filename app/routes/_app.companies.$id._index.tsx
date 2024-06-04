import { type LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Heading } from '~/components/Heading';
import { getSupabaseWithHeaders } from '~/utils/supabase.server';

export async function loader({ request, params }: LoaderFunctionArgs) {
    const { supabase } = await getSupabaseWithHeaders({ request });
    try {
        const response = await supabase
            .from('company')
            .select('*')
            .eq('id', params.id!);

        const company = response?.data?.shift();

        return json({ company });
    } catch (error) {
        console.error(error);
    }
}

export default function CompanyDetailsIndexRoute() {
    const { company } = useLoaderData<typeof loader>();

    return (
        <>
            <Heading>{company?.name}</Heading>
        </>
    );
}
