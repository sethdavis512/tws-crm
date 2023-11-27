import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { Button } from '~/components/Button';
import { Heading } from '~/components/Heading';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { getCustomer, updateCustomer } from '~/models/customer.server';
import { Urls } from '~/utils/constants';

export async function loader({ params }: LoaderFunctionArgs) {
    invariant(params.id, 'ID param not found');
    const customerDetails = await getCustomer({ id: params.id });

    return json({
        customerDetails
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

    const caseObj = await updateCustomer({
        id: customerId,
        firstName,
        lastName
    });

    return redirect(`${Urls.CASES}/${caseObj.id}`);
}

export default function EditCaseRoute() {
    const { customerDetails } = useLoaderData<typeof loader>();

    return (
        <div className="col-span-4 py-4 pl-8 pr-8">
            <Heading className="mb-8">Edit customer</Heading>
            <Form method="POST" className="space-y-4">
                <input
                    type="hidden"
                    value={customerDetails?.id}
                    name="caseId"
                />
                <div>
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

                <Button variant="primary" size="md" type="submit">
                    Update
                </Button>
            </Form>
        </div>
    );
}
