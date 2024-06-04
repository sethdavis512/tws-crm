import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { ScrollyColumn } from '~/components/ScrollyColumn';
import { ScrollyPanel } from '~/components/ScrollyPanel';
import { getCustomer, updateCustomer } from '~/models/customer.server';
import { Urls } from '~/utils/constants';

export async function loader({ params }: LoaderFunctionArgs) {
    invariant(params.id, 'ID param not found');
    const customerDetails = await getCustomer({ id: params.id });

    return json({
        customerDetails,
    });
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();

    const customerId = form.get('customerId') as string;
    const firstName = form.get('firstName') as string;
    const lastName = form.get('lastName') as string;

    invariant(customerId, 'Customer ID not defined');
    invariant(firstName, 'First name not defined');
    invariant(lastName, 'Last name not defined');

    const customerObj = await updateCustomer({
        id: customerId,
        firstName,
        lastName,
    });

    return redirect(`${Urls.CUSTOMERS}/${customerObj.id}`);
}

export default function EditCaseRoute() {
    const { customerDetails } = useLoaderData<typeof loader>();

    return (
        <ScrollyColumn>
            <ScrollyPanel heading="Edit customer" padded>
                <Form method="POST" className="max-w-lg space-y-4">
                    <div>
                        <input
                            type="hidden"
                            value={customerDetails?.id}
                            name="customerId"
                        />
                        <Label htmlFor="title">First</Label>
                        <Input
                            name="firstName"
                            type="text"
                            defaultValue={customerDetails?.firstName}
                        />
                    </div>
                    <div>
                        <Label htmlFor="title">Last</Label>
                        <Input
                            name="lastName"
                            type="text"
                            defaultValue={customerDetails?.lastName}
                        />
                    </div>
                    <Button type="submit">Update</Button>
                </Form>
            </ScrollyPanel>
        </ScrollyColumn>
    );
}
