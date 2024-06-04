import { Button } from '@lemonsqueezy/wedges';
import type { LoaderFunctionArgs } from '@remix-run/node';
import {
    Link,
    Outlet,
    json,
    redirect,
    useFetcher,
    useOutletContext,
} from '@remix-run/react';
import { HomeIcon, Moon, Sun } from 'lucide-react';
import Flex from '~/components/Flex';

import {
    BORDER_BOTTOM_COLORS,
    BORDER_TOP_COLORS,
    LINK_STYLES,
} from '~/constants';
import type { SupabaseOutletContext } from '~/utils/supabase';
import { getSupabaseWithSessionAndHeaders } from '~/utils/supabase.server';
import { Theme } from '~/utils/theme-provider';

export async function loader({ request }: LoaderFunctionArgs) {
    const { headers, serverSession } = await getSupabaseWithSessionAndHeaders({
        request,
    });

    if (!serverSession) {
        return redirect('/login', { headers });
    }

    return json({});
}

export default function AppRoute() {
    const { supabase, theme } = useOutletContext<SupabaseOutletContext>();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    const themeFetcher = useFetcher();
    const isThemeDark = theme === Theme.DARK;

    return (
        <div className="grid h-full w-full grid-cols-12 grid-rows-[auto_1fr_auto]">
            <header className={`col-span-full ${BORDER_BOTTOM_COLORS}`}>
                <nav className={`px-8 py-4`}>
                    <Flex className="justify-between">
                        <Flex className="gap-4">
                            <Link to="/">
                                <strong className="text-2xl">CRM</strong>
                            </Link>
                            <Link to="/">
                                <HomeIcon />
                            </Link>
                        </Flex>
                        <Flex>
                            <themeFetcher.Form
                                method="POST"
                                action="/api/theme"
                            >
                                <Button
                                    type="submit"
                                    name="themeSelection"
                                    value={
                                        isThemeDark ? Theme.LIGHT : Theme.DARK
                                    }
                                    aria-label={`Toggle theme to ${
                                        isThemeDark ? 'light' : 'dark'
                                    } theme`}
                                    variant="transparent"
                                >
                                    <span className="sr-only">
                                        Toggle to{' '}
                                        {isThemeDark ? 'light' : 'dark'} theme
                                    </span>
                                    {isThemeDark ? <Moon /> : <Sun />}
                                </Button>
                            </themeFetcher.Form>
                            <Button
                                onClick={handleSignOut}
                                variant="transparent"
                            >
                                Sign out
                            </Button>
                        </Flex>
                    </Flex>
                </nav>
            </header>
            <Outlet />
            <footer className={`col-span-full ${BORDER_TOP_COLORS} p-8`}>
                Built by{' '}
                <a className={LINK_STYLES} href="https://www.sethdavis.io">
                    Seth Davis
                </a>{' '}
                🤠
            </footer>
        </div>
    );
}
