import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import AppLayout from '~/components/AppLayout';
import NewButtonLink from '~/components/NewButtonLink';
import StickyHeader from '~/components/StickyHeader';
import { getAllCustomers } from '~/models/customer.server';

export async function loader() {
    return json({ customers: await getAllCustomers() });
}

export default function CustomersRoute() {
    const { customers } = useLoaderData<typeof loader>();

    return (
        <AppLayout>
            <StickyHeader text="Customers">
                <NewButtonLink to="create" />
            </StickyHeader>
            {customers && customers.length > 0 ? (
                customers.map((customer) => (
                    <div
                        key={customer.id}
                        className="bg-white border-b border-b-gray-200 dark:bg-gray-800 dark:border-gray-700"
                    >
                        <Link
                            className="block p-4 text-lg font-bold tracking-tight text-gray-900 dark:text-white"
                            to={customer.id}
                        >
                            {customer.firstName} {customer.lastName}
                        </Link>
                    </div>
                ))
            ) : (
                <div className="p-8">
                    No customers yet.{' '}
                    <Link to="create" className="text-cyan-500">
                        Create one.
                    </Link>
                </div>
            )}
        </AppLayout>
    );
}
