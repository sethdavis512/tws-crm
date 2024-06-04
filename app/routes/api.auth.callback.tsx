import { redirect, type LoaderFunctionArgs } from '@remix-run/node';
import { getSupabaseWithHeaders } from '~/utils/supabase.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const requestUrl = new URL(request.url);

    const code = requestUrl.searchParams.get('code');
    const redirectUrl = `${process.env.DOMAIN_URL}/dashboard` || '/';
    const headers = new Headers();

    if (code) {
        const { headers, supabase } = getSupabaseWithHeaders({ request });
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return redirect(redirectUrl, { headers });
        }
    }

    // return the user to an error page with instructions
    return redirect('/login', { headers });
}
