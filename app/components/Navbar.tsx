import { Link, useFetcher } from '@remix-run/react';
import { CogIcon, Menu, Moon, Search, Sun } from 'lucide-react';
import type { User } from '@prisma/client';

import { BORDER_BOTTOM_COLORS, Urls } from '~/utils/constants';
import { Theme } from '~/utils/theme-provider';
import { cn } from '~/utils/css';
import { Drawer } from './Drawer';
import { useToggle } from '~/hooks/useToggle';
import { Button } from './Button';

interface NavbarProps {
    className?: string;
    theme: Theme;
    user: User;
}

export function Navbar({ className, theme, user }: NavbarProps) {
    const themeFetcher = useFetcher();
    const logoutFetcher = useFetcher();
    const [isDrawerOpen, toggleDrawer] = useToggle();

    return (
        <>
            <header
                className={cn(
                    `col-span-full bg-white px-4 py-2.5 dark:bg-zinc-900 z-30 ${BORDER_BOTTOM_COLORS}`,
                    className
                )}
            >
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center">
                        <button
                            data-drawer-target="drawer-navigation"
                            data-drawer-toggle="drawer-navigation"
                            aria-controls="drawer-navigation"
                            className="p-2 mr-2 text-zinc-600 rounded-lg cursor-pointer md:hidden hover:text-zinc-900 hover:bg-zinc-100 focus:bg-zinc-100 dark:focus:bg-zinc-700 focus:ring-2 focus:ring-zinc-100 dark:focus:ring-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
                        >
                            <Menu />
                            <span className="sr-only">Toggle sidebar</span>
                        </button>
                        <Link
                            to={Urls.DASHBOARD}
                            className="flex items-center justify-between mr-4"
                        >
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                CRM
                            </span>
                        </Link>
                    </div>
                    <div className="flex gap-3 items-center lg:order-2">
                        {!!user && (
                            <img
                                className="w-8 h-8 rounded-full"
                                src="https://www.github.com/sethdavis512.png"
                                alt="Seth Davis"
                            />
                        )}
                        <Button
                            variant="secondary"
                            onClick={toggleDrawer}
                            className="p-2"
                        >
                            <CogIcon className="h-5 w-5" />
                        </Button>
                        {!!user && (
                            <logoutFetcher.Form method="POST" action="logout">
                                <Button variant="secondary" type="submit">
                                    Sign out
                                </Button>
                            </logoutFetcher.Form>
                        )}
                    </div>
                </div>
            </header>
            <Drawer
                backdrop
                heading="Settings"
                id="test1234"
                isOpen={isDrawerOpen}
                handleClose={toggleDrawer}
                position="right"
            >
                <themeFetcher.Form
                    method="POST"
                    action="/api/theme"
                    className="flex items-center gap-4"
                >
                    <Button
                        variant="secondary"
                        type="submit"
                        name="themeSelection"
                        value={theme === Theme.DARK ? Theme.LIGHT : Theme.DARK}
                        className="p-2"
                    >
                        <span className="sr-only">
                            Toggle light and dark theme
                        </span>
                        {theme === Theme.DARK ? <Moon /> : <Sun />}
                    </Button>
                    <p className="block">{`${
                        theme === Theme.DARK ? 'Dark' : 'Light'
                    } mode`}</p>
                </themeFetcher.Form>
            </Drawer>
        </>
    );
}
