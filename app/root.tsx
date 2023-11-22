import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData
} from '@remix-run/react';

import { getThemeSession } from './utils/theme.server';

import '~/tailwind.css';
import SiteLayout from './components/SiteLayout';
import { getUser } from './utils/auth.server';
import type { User } from '@prisma/client';
import { BACKGROUND_COLORS } from './utils/constants';

export const meta: MetaFunction = () => {
    return [
        { title: 'CRM' },
        { name: 'description', content: 'Customer Relation Management System' }
    ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const themeSession = await getThemeSession(request);
    const user = await getUser(request);

    return json({
        theme: themeSession.getTheme(),
        user
    });
};

export default function App() {
    const data = useLoaderData<typeof loader>();

    return (
        <html lang="en" className={data.theme}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body className={`${BACKGROUND_COLORS} overflow-hidden`}>
                <SiteLayout theme={data.theme} user={data.user as User}>
                    <Outlet />
                </SiteLayout>
                <ScrollRestoration />
                <LiveReload />
                <Scripts />
            </body>
        </html>
    );
}
