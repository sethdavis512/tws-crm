import { Link } from '@remix-run/react';
import {
    ActivitySquare,
    Building,
    ChevronDown,
    ChevronRight,
    Gauge,
    Users
} from 'lucide-react';
import { useReducer } from 'react';
import { Urls } from '~/utils/constants';
import { cn } from '~/utils/css';
import FoldableList from './FoldableList';

interface LeftNavProps {
    className: string;
}

export default function LeftNav({ className }: LeftNavProps) {
    const asideClassName = cn(
        'z-40 md:col-span-4 xl:col-span-2 h-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700',
        className
    );

    const [isInteractionsOpen, toggleInteractionsOpen] = useReducer(
        (s) => !s,
        false
    );

    return (
        <aside
            className={asideClassName}
            aria-label="Sidenav"
            id="drawer-navigation"
        >
            <div className="overflow-y-auto py-5 px-3 h-full">
                <ul className="space-y-2">
                    <li>
                        <Link
                            to={Urls.DASHBOARD}
                            className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <Gauge />
                            <span className="ml-3">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <FoldableList
                            icon={<ActivitySquare />}
                            text="Interactions"
                        >
                            <li>
                                <Link
                                    to={Urls.INTERACTIONS}
                                    className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                >
                                    View all
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`${Urls.INTERACTIONS}/create`}
                                    className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                >
                                    Create new
                                </Link>
                            </li>
                        </FoldableList>
                    </li>
                    <li>
                        <FoldableList icon={<Building />} text="Companies">
                            <li>
                                <Link
                                    to={Urls.COMPANIES}
                                    className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                >
                                    View all
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`${Urls.COMPANIES}/create`}
                                    className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                >
                                    Create new
                                </Link>
                            </li>
                        </FoldableList>
                    </li>
                    <li>
                        <FoldableList icon={<Users />} text="Customers">
                            <li>
                                <Link
                                    to={Urls.CUSTOMERS}
                                    className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                >
                                    View all
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`${Urls.CUSTOMERS}/create`}
                                    className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                >
                                    Create new
                                </Link>
                            </li>
                        </FoldableList>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
