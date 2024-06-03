import { NavLink } from '@remix-run/react';
import { ActivitySquare, Building, Files, Gauge, Users } from 'lucide-react';

import { Urls } from '~/utils/constants';
import { FoldableList } from './FoldableList';
import { Button } from '@lemonsqueezy/wedges';

export function LeftNav() {
    return (
        <nav className="sm:px-4 sm:pt-4">
            <ul className="space-y-2">
                <li>
                    <Button
                        asChild
                        variant="transparent"
                        className="flex justify-start"
                    >
                        <NavLink to={Urls.DASHBOARD}>
                            <div>
                                <Gauge className="w-5 h-5" />
                            </div>
                            <span className="ml-3">Dashboard</span>
                        </NavLink>
                    </Button>
                </li>
                <li>
                    <FoldableList
                        icon={<Files className="w-5 h-5" />}
                        text="Cases"
                    >
                        <li>
                            <Button
                                asChild
                                variant="transparent"
                                className="flex justify-start"
                            >
                                <NavLink to={Urls.CASES} end>
                                    View all
                                </NavLink>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="transparent"
                                className="flex justify-start"
                            >
                                <NavLink to={`${Urls.CASES}/create`}>
                                    Create new
                                </NavLink>
                            </Button>
                        </li>
                    </FoldableList>
                </li>
                <li>
                    <FoldableList
                        icon={<ActivitySquare className="w-5 h-5" />}
                        text="Interactions"
                    >
                        <li>
                            <Button
                                asChild
                                variant="transparent"
                                className="flex justify-start"
                            >
                                <NavLink to={Urls.INTERACTIONS} end>
                                    View all
                                </NavLink>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="transparent"
                                className="flex justify-start"
                            >
                                <NavLink to={`${Urls.INTERACTIONS}/create`}>
                                    Create new
                                </NavLink>
                            </Button>
                        </li>
                    </FoldableList>
                </li>
                <li>
                    <FoldableList
                        icon={<Building className="w-5 h-5" />}
                        text="Companies"
                    >
                        <li>
                            <Button
                                asChild
                                variant="transparent"
                                className="flex justify-start"
                            >
                                <NavLink to={Urls.COMPANIES} end>
                                    View all
                                </NavLink>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="transparent"
                                className="flex justify-start"
                            >
                                <NavLink to={`${Urls.COMPANIES}/create`}>
                                    Create new
                                </NavLink>
                            </Button>
                        </li>
                    </FoldableList>
                </li>
                <li>
                    <FoldableList
                        icon={<Users className="w-5 h-5" />}
                        text="Customers"
                    >
                        <li>
                            <Button
                                asChild
                                variant="transparent"
                                className="flex justify-start"
                            >
                                <NavLink to={Urls.CUSTOMERS} end>
                                    View all
                                </NavLink>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="transparent"
                                className="flex justify-start"
                            >
                                <NavLink to={`${Urls.CUSTOMERS}/create`}>
                                    Create new
                                </NavLink>
                            </Button>
                        </li>
                    </FoldableList>
                </li>
            </ul>
        </nav>
    );
}
