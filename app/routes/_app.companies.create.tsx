import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { createCompany } from '~/models/company.server';

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();
    const name = form.get('name') as string;

    invariant(name, 'Name not defined');

    const interaction = await createCompany({
        name
    });

    return redirect(`/companies/${interaction.id}`);
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
