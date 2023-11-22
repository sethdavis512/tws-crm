import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { Textarea } from '~/components/Textarea';
import { getAllCustomers } from '~/models/customer.server';
import { createInteraction } from '~/models/interaction.server';
import { getUserId } from '~/utils/auth.server';

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
        userId
    });

    return redirect(`/interactions/${interaction.id}`);
}

export default function CreateInteractionRoute() {
    const { allCustomers } = useLoaderData<typeof loader>();

    return (
        <div className="col-span-4 p-8">
            <h1 className="text-4xl font-bold mb-4">Create interaction</h1>
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
