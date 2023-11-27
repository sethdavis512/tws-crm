import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { Button } from '~/components/Button';
import { Heading } from '~/components/Heading';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { Textarea } from '~/components/Textarea';
import { getAllCustomers } from '~/models/customer.server';
import { createInteraction } from '~/models/interaction.server';
import { getUserId } from '~/utils/auth.server';
import { Urls } from '~/utils/constants';

export async function loader({ request }: LoaderFunctionArgs) {
    const allCustomers = await getAllCustomers();

    return json({
        allCustomers
    });
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();
    const userId = await getUserId(request);

    const title = form.get('title') as string;
    const description = form.get('description') as string;
    const customerId = form.get('customerId') as string;

    invariant(title, 'Title not defined');
    invariant(description, 'Description not defined');
    invariant(customerId, 'Customer ID not defined');
    invariant(userId, 'User ID not defined');

    const interaction = await createInteraction({
        title,
        description,
        customerId,
        userId,
        type: 'EMAIL'
    });

    return redirect(`${Urls.INTERACTIONS}/${interaction.id}`);
}

export default function CreateInteractionRoute() {
    const { allCustomers } = useLoaderData<typeof loader>();

    return (
        <div className="col-span-4 py-4 pl-8 pr-8">
            <Heading className="mb-4">Create interaction</Heading>
            <Form method="POST" className="space-y-4">
                <div>
                    <Label htmlFor="customerId">Customer ID</Label>
                    <select
                        name="customerId"
                        className="dark:bg-gray-800 rounded-md"
                    >
                        {allCustomers.map((customer) => (
                            <option value={customer.id} key={customer.id}>
                                {customer.firstName} {customer.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input name="title" type="text" />
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea name="description" />
                </div>

                <Button type="submit">Create interaction</Button>
            </Form>
        </div>
    );
}
