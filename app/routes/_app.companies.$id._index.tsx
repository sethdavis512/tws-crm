import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getSupabaseWithHeaders } from '~/utils/supabase.server';

export async function loader({ request, params }: LoaderFunctionArgs) {
    const { supabase } = await getSupabaseWithHeaders({ request });
    const company = await supabase
        .from('company')
        .select('*')
        .eq('id', params.id!);

    return json({
        company
    });
}

export async function action({ request }: ActionFunctionArgs) {
    // const form = await request.formData();
    return null;
}

export default function CompanyDetailsIndexRoute() {
    const data = useLoaderData<typeof loader>();

    return <>{JSON.stringify(data, null, 4)}</>;
}
