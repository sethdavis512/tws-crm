import { Link, useFetcher } from '@remix-run/react';
import { Menu, Moon, Search, Sun } from 'lucide-react';
import type { User } from '@prisma/client';

import { Urls } from '~/utils/constants';
import { Theme } from '~/utils/theme-provider';
import { cn } from '~/utils/css';

interface NavbarProps {
    className?: string;
    theme: Theme;
    user: User;
}

export function Navbar({ className, theme, user }: NavbarProps) {
    const themeFetcher = useFetcher();
    const logoutFetcher = useFetcher();

    return (
        <nav
            className={cn(
                'col-span-full bg-white border-b border-zinc-200 px-4 py-2.5 dark:bg-zinc-800 dark:border-zinc-700 z-50',
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
                <div className="flex items-center lg:order-2">
                    <button
                        type="button"
                        data-drawer-toggle="drawer-navigation"
                        aria-controls="drawer-navigation"
                        className="p-2 mr-1 text-zinc-500 rounded-lg md:hidden hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-700 focus:ring-4 focus:ring-zinc-300 dark:focus:ring-zinc-600"
                    >
                        <span className="sr-only">Toggle search</span>
                        <Search />
                    </button>
                    <themeFetcher.Form method="POST" action="/api/theme">
                        <button
                            type="submit"
                            className="p-2 mr-1 text-zinc-500 rounded-lg hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-700 focus:ring-4 focus:ring-zinc-300 dark:focus:ring-zinc-600"
                            name="themeSelection"
                            value={
                                theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
                            }
                        >
                            <span className="sr-only">View notifications</span>
                            {theme === Theme.DARK ? <Sun /> : <Moon />}
                        </button>
                    </themeFetcher.Form>
                    {!!user && (
                        <>
                            <img
                                className="w-8 h-8 rounded-full"
                                src="https://www.github.com/sethdavis512.png"
                                alt="Seth Davis"
                            />
                            <logoutFetcher.Form method="POST" action="logout">
                                <button
                                    type="submit"
                                    className="w-full flex justify-between items-center py-2 px-4 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white"
                                >
                                    Sign out
                                </button>
                            </logoutFetcher.Form>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
