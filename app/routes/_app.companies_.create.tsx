import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { createCustomer } from '~/models/customer.server';

export async function loader({ request }: LoaderFunctionArgs) {
    return json({});
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();

    const firstName = form.get('firstName') as string;
    const lastName = form.get('lastName') as string;

    invariant(firstName, 'First name not defined');
    invariant(lastName, 'Last name not defined');

    const interaction = await createCustomer({
        firstName,
        lastName
    });

    return redirect(`/customers/${interaction.id}`);
}

export default function CreateInteractionRoute() {
    return (
        <div className="col-span-4 p-8">
            <h1 className="text-4xl font-bold mb-4">Create company</h1>
            <Form method="POST" className="space-y-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input name="name" type="text" />
                </div>

                <Button type="submit">Create company</Button>
            </Form>
        </div>
    );
}
