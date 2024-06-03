import { type LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, json } from '@remix-run/react';
import { getSupabaseWithHeaders } from '~/utils/supabase.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = await getSupabaseWithHeaders({ request });
    const response = await supabase.from('company').select('*');

    return json({
        companies: response.data
    });
}

export default function CompanyDetailRoute() {
    return <Outlet />;
}
