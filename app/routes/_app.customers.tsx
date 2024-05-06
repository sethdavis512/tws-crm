import { json } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';

import { Heading } from '~/components/Heading';
import { NewButtonLink } from '~/components/NewButtonLink';
import ParentLayout from '~/components/ParentLayout';
import { getAllCustomers } from '~/models/customer.server';
import { PRIMARY_COLOR } from '~/utils/constants';
import { getPanelLinkClassName } from '~/utils/css';

export async function loader() {
    return json({ customers: await getAllCustomers() });
}

export default function CustomersRoute() {
    const { id: customerIdParam } = useParams();
    const { customers } = useLoaderData<typeof loader>();

    return (
        <ParentLayout heading="Customers" aux={<NewButtonLink to="create" />}>
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
                    <Link to="create" className={PRIMARY_COLOR}>
                        Create one.
                    </Link>
                </div>
            )}
        </ParentLayout>
    );
}
