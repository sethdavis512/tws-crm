import { Button } from '@lemonsqueezy/wedges';
import type { LoaderFunctionArgs } from '@remix-run/node';
import {
    Link,
    Outlet,
    redirect,
    useFetcher,
    useOutletContext,
} from '@remix-run/react';
import { HomeIcon, LogOutIcon, MenuIcon, Moon, Sun } from 'lucide-react';
import Divider from '~/components/Divider';
import { Drawer } from '~/components/Drawer';
import Flex from '~/components/Flex';
import { LeftNav } from '~/components/LeftNav';

import {
    BORDER_BOTTOM_COLORS,
    BORDER_TOP_COLORS,
    LINK_STYLES,
} from '~/constants';
import { useToggle } from '~/hooks/useToggle';
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

    return null;
}

export default function AppRoute() {
    const { supabase, theme } = useOutletContext<SupabaseOutletContext>();
    const [menuOpen, toggleMenuOpen] = useToggle();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    const themeFetcher = useFetcher();
    const isThemeDark = theme === Theme.DARK;

    return (
        <>
            <div className="grid h-full w-full grid-cols-12 grid-rows-[auto_auto_1fr_auto]">
                <div
                    className={`col-span-full bg-yellow-300 p-4 text-center text-black dark:bg-yellow-600 dark:text-white ${BORDER_BOTTOM_COLORS}`}
                >
                    🚧 App is currently a work in progress 🔨
                </div>
                <header className={`col-span-full ${BORDER_BOTTOM_COLORS}`}>
                    <nav className={`p-4`}>
                        <Flex className="justify-between">
                            <Flex className="gap-4">
                                <Link to="/">
                                    <strong className="text-2xl">CRM</strong>
                                </Link>
                                <Button variant="transparent" asChild>
                                    <Link to="/">
                                        <HomeIcon />
                                    </Link>
                                </Button>
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
                                            isThemeDark
                                                ? Theme.LIGHT
                                                : Theme.DARK
                                        }
                                        aria-label={`Toggle theme to ${
                                            isThemeDark ? 'light' : 'dark'
                                        } theme`}
                                        variant="transparent"
                                    >
                                        <span className="sr-only">
                                            Toggle to{' '}
                                            {isThemeDark ? 'light' : 'dark'}{' '}
                                            theme
                                        </span>
                                        {isThemeDark ? <Sun /> : <Moon />}
                                    </Button>
                                </themeFetcher.Form>
                                <Button
                                    className="md:hidden"
                                    variant="transparent"
                                    onClick={toggleMenuOpen}
                                >
                                    <MenuIcon />
                                </Button>
                                <Button
                                    className="hidden md:block"
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
            <Drawer
                id="navDrawer"
                isOpen={menuOpen}
                position="right"
                handleClose={toggleMenuOpen}
            >
                <LeftNav />
                <Divider />
                <Button
                    className="w-full justify-start md:hidden"
                    onClick={handleSignOut}
                    variant="transparent"
                    before={<LogOutIcon />}
                >
                    Sign out
                </Button>
            </Drawer>
        </>
    );
}
