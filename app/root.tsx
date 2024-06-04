import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from '@remix-run/react';

import {
    getSupabaseEnv,
    getSupabaseWithSessionAndHeaders,
} from './utils/supabase.server';
import { useSupabase } from './utils/supabase';
import { getThemeSession } from './utils/theme.server';

import '~/tailwind.css';

export const meta: MetaFunction = () => {
    return [
        { title: 'CRM' },
        { name: 'description', content: 'Customer Relation Management System' },
    ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const themeSession = await getThemeSession(request);
    const { serverSession, headers } = await getSupabaseWithSessionAndHeaders({
        request,
    });
    const domainUrl = process.env.DOMAIN_URL!;
    const env = getSupabaseEnv();

    return json(
        {
            serverSession,
            env,
            domainUrl,
            theme: themeSession.getTheme(),
        },
        { headers }
    );
};

export default function App() {
    const { env, serverSession, domainUrl, theme } =
        useLoaderData<typeof loader>();

    const { supabase } = useSupabase({ env, serverSession });
    const isLoggedIn = !!serverSession;

    const htmlClassName = `h-full ${theme}`;
    const bodyClassName = `h-full`;

    return (
        <html lang="en" className={htmlClassName}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body className={bodyClassName}>
                <Outlet context={{ supabase, domainUrl, theme, isLoggedIn }} />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
