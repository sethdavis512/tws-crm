import { ActivitySquare, Building, Files, Gauge, Users } from 'lucide-react';

import { Urls } from '~/utils/constants';
import { FoldableList } from './FoldableList';
import AppNavLink from './AppNavLink';

export function LeftNav() {
    return (
        <nav className="sm:px-4 sm:pt-4">
            <ul className="space-y-2">
                <li>
                    <AppNavLink
                        to={Urls.DASHBOARD}
                        className={
                            'flex items-center justify-start gap-2 rounded-lg p-2'
                        }
                    >
                        <div>
                            <Gauge className="h-5 w-5" />
                        </div>
                        <div>Dashboard</div>
                    </AppNavLink>
                </li>
                <li>
                    <FoldableList
                        icon={<Building className="h-5 w-5" />}
                        text="Companies"
                    >
                        <AppNavLink to={Urls.COMPANIES} end>
                            View all
                        </AppNavLink>
                        <AppNavLink to={`${Urls.COMPANIES}/create`}>
                            Create new
                        </AppNavLink>
                    </FoldableList>
                </li>
                <li>
                    <FoldableList
                        icon={<Users className="h-5 w-5" />}
                        text="Customers"
                    >
                        <AppNavLink to={Urls.CUSTOMERS} end>
                            View all
                        </AppNavLink>
                        <AppNavLink to={`${Urls.CUSTOMERS}/create`}>
                            Create new
                        </AppNavLink>
                    </FoldableList>
                </li>
                <li>
                    <FoldableList
                        icon={<Files className="h-5 w-5" />}
                        text="Cases"
                    >
                        <AppNavLink to={Urls.CASES} end>
                            View all
                        </AppNavLink>
                        <AppNavLink to={`${Urls.CASES}/create`}>
                            Create new
                        </AppNavLink>
                    </FoldableList>
                </li>
                <li>
                    <FoldableList
                        icon={<ActivitySquare className="h-5 w-5" />}
                        text="Interactions"
                    >
                        <AppNavLink to={Urls.INTERACTIONS} end>
                            View all
                        </AppNavLink>
                        <AppNavLink to={`${Urls.INTERACTIONS}/create`}>
                            Create new
                        </AppNavLink>
                    </FoldableList>
                </li>
            </ul>
        </nav>
    );
}
