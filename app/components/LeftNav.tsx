import { Link } from '@remix-run/react';
import { ActivitySquare, Building, Files, Gauge, Users } from 'lucide-react';

import { Urls } from '~/utils/constants';
import FoldableList from './FoldableList';

export default function LeftNav() {
    return (
        <>
            <div className="py-5 px-3">
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
                        <FoldableList icon={<Files />} text="Cases">
                            <li>
                                <Link
                                    to={Urls.CASES}
                                    className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                >
                                    View all
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`${Urls.CASES}/create`}
                                    className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                >
                                    Create new
                                </Link>
                            </li>
                        </FoldableList>
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
        </>
    );
}
