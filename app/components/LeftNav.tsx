import {
    Building,
    CircleDollarSign,
    Gauge,
    RouteIcon,
    Users,
} from 'lucide-react';

import { Urls } from '~/constants';
import { FoldableList } from './FoldableList';
import AppNavLink from './AppNavLink';
import { cx } from 'cva.config';

interface LeftNavProps {
    className?: string;
}

export function LeftNav({ className }: LeftNavProps) {
    const iconProps = { className: 'h-5 w-5' };

    return (
        <nav className={cx(className)}>
            <ul className="space-y-2">
                <li>
                    <AppNavLink
                        to={Urls.DASHBOARD}
                        className={
                            'flex items-center justify-start gap-2 rounded-lg p-2'
                        }
                    >
                        <div>
                            <Gauge {...iconProps} />
                        </div>
                        <div>Dashboard</div>
                    </AppNavLink>
                </li>
                <li>
                    <FoldableList
                        icon={<Building {...iconProps} />}
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
                        icon={<Users {...iconProps} />}
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
                        icon={<CircleDollarSign {...iconProps} />}
                        text="Deals"
                    >
                        <AppNavLink to={Urls.DEALS} end>
                            View all
                        </AppNavLink>
                        <AppNavLink to={`${Urls.DEALS}/create`}>
                            Create new
                        </AppNavLink>
                    </FoldableList>
                </li>
                <li>
                    <FoldableList
                        icon={<RouteIcon {...iconProps} />}
                        text="Leads"
                    >
                        <AppNavLink to={Urls.LEADS} end>
                            View all
                        </AppNavLink>
                        <AppNavLink to={`${Urls.LEADS}/create`}>
                            Create new
                        </AppNavLink>
                    </FoldableList>
                </li>
            </ul>
        </nav>
    );
}
