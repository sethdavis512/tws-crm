import { Button } from '@lemonsqueezy/wedges';
import type { LoaderFunctionArgs } from '@remix-run/node';
import {
    Outlet,
    json,
    redirect,
    useFetcher,
    useOutletContext
} from '@remix-run/react';
import { Moon, Sun } from 'lucide-react';
import Flex from '~/components/Flex';

import { BORDER_BOTTOM_COLORS, BORDER_TOP_COLORS } from '~/constants';
import type { SupabaseOutletContext } from '~/utils/supabase';
import { getSupabaseWithSessionAndHeaders } from '~/utils/supabase.server';
import { Theme } from '~/utils/theme-provider';

export async function loader({ request }: LoaderFunctionArgs) {
    const { headers, serverSession } = await getSupabaseWithSessionAndHeaders({
        request
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
        <div className="grid grid-cols-12 h-full w-full grid-rows-[auto_1fr_auto]">
            <header className="col-span-full">
                <nav className={`${BORDER_BOTTOM_COLORS} px-8 py-4`}>
                    <Flex className="justify-between">
                        <div>
                            <strong>CRM</strong>
                        </div>
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
                Footie
            </footer>
        </div>
    );
}
