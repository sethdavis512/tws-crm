import { json } from '@remix-run/node';
import { Link, Outlet, useLoaderData, useParams } from '@remix-run/react';

import { Heading } from '~/components/Heading';
import { NewButtonLink } from '~/components/NewButtonLink';
import { ScrollyColumn } from '~/components/ScrollyColumn';
import { ScrollyPanel } from '~/components/ScrollyPanel';
import { getAllCustomers } from '~/models/customer.server';
import { getPanelLinkClassName } from '~/utils/css';

export async function loader() {
    return json({ customers: await getAllCustomers() });
}

export default function CustomersRoute() {
    const { id: customerIdParam } = useParams();
    const { customers } = useLoaderData<typeof loader>();

    return (
        <>
            <ScrollyColumn size={3}>
                <ScrollyPanel
                    aux={<NewButtonLink to="create" />}
                    text="Customers"
                >
                    {customers && customers.length > 0 ? (
                        customers.map((customer) => {
                            const linkClassName = getPanelLinkClassName(
                                customer.id === customerIdParam
                            );
                            return (
                                <Link
                                    key={customer.id}
                                    className={linkClassName}
                                    to={customer.id}
                                >
                                    <Heading size="4">
                                        {customer.firstName} {customer.lastName}
                                    </Heading>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="p-8">
                            No customers yet.{' '}
                            <Link to="create" className="text-cyan-500">
                                Create one.
                            </Link>
                        </div>
                    )}
                </ScrollyPanel>
            </ScrollyColumn>
            <Outlet />
        </>
    );
}
