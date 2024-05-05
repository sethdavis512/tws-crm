import { NavLink } from '@remix-run/react';
import { ActivitySquare, Building, Files, Gauge, Users } from 'lucide-react';

import { Urls } from '~/utils/constants';
import { FoldableList } from './FoldableList';

export function LeftNav() {
    const navLinkClassFn = ({ isActive }: { isActive: boolean }) =>
        `flex items-center p-2 pl-11 w-full text-base font-medium text-zinc-900 rounded-lg transition duration-75 group hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700 ${
            isActive ? 'bg-green-500' : ''
        }`;

    return (
        <nav className="py-5 px-3">
            <ul className="space-y-2">
                <li>
                    <NavLink
                        to={Urls.DASHBOARD}
                        className={({ isActive }) =>
                            `flex items-center p-2 text-base font-medium text-zinc-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group ${
                                isActive ? 'bg-green-500' : ''
                            }`
                        }
                    >
                        <div>
                            <Gauge className="w-5 h-5" />
                        </div>
                        <span className="ml-3">Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <FoldableList
                        icon={<Files className="w-5 h-5" />}
                        text="Cases"
                    >
                        <li>
                            <NavLink
                                to={Urls.CASES}
                                className={navLinkClassFn}
                                end
                            >
                                View all
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`${Urls.CASES}/create`}
                                className={navLinkClassFn}
                            >
                                Create new
                            </NavLink>
                        </li>
                    </FoldableList>
                </li>
                <li>
                    <FoldableList
                        icon={<ActivitySquare className="w-5 h-5" />}
                        text="Interactions"
                    >
                        <li>
                            <NavLink
                                to={Urls.INTERACTIONS}
                                className={navLinkClassFn}
                                end
                            >
                                View all
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`${Urls.INTERACTIONS}/create`}
                                className={navLinkClassFn}
                            >
                                Create new
                            </NavLink>
                        </li>
                    </FoldableList>
                </li>
                <li>
                    <FoldableList
                        icon={<Building className="w-5 h-5" />}
                        text="Companies"
                    >
                        <li>
                            <NavLink
                                to={Urls.COMPANIES}
                                className={navLinkClassFn}
                                end
                            >
                                View all
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`${Urls.COMPANIES}/create`}
                                className={navLinkClassFn}
                            >
                                Create new
                            </NavLink>
                        </li>
                    </FoldableList>
                </li>
                <li>
                    <FoldableList
                        icon={<Users className="w-5 h-5" />}
                        text="Customers"
                    >
                        <li>
                            <NavLink
                                to={Urls.CUSTOMERS}
                                className={navLinkClassFn}
                                end
                            >
                                View all
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`${Urls.CUSTOMERS}/create`}
                                className={navLinkClassFn}
                            >
                                Create new
                            </NavLink>
                        </li>
                    </FoldableList>
                </li>
            </ul>
        </nav>
    );
}
