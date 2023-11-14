import {
    json,
    type MetaFunction,
    type LoaderFunctionArgs
} from '@remix-run/node';
import { type User } from '@prisma/client';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData
} from '@remix-run/react';

import { getThemeSession } from '~/utils/theme.server';
import { getUser } from './utils/auth.server';
import LeftNav from './components/LeftNav';
import Navbar from './components/Navbar';

import '~/tailwind.css';

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
        <html lang="en" className={`${data.theme} h-full`}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body className="bg-white dark:bg-gray-800 h-full grid grid-rows-[3.75rem_auto] text-zinc-800 dark:text-zinc-200">
                <Navbar theme={data.theme} user={data.user as User} />
                <div className="h-full col-span-full grid grid-cols-12">
                    <LeftNav className="md:col-span-4 xl:col-span-2" />
                    <main className="md:col-span-8 xl:col-span-10">
                        <Outlet />
                    </main>
                </div>
                <ScrollRestoration />
                <LiveReload />
                <Scripts />
            </body>
        </html>
    );
}
