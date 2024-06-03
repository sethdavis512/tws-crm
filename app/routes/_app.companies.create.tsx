import { Button, Input, Label } from '@lemonsqueezy/wedges';
import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { createCompany } from '~/models/company.server';
import { Urls } from '~/utils/constants';

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();
    const name = form.get('name') as string;

    invariant(name, 'Name not defined');

    const company = await createCompany({
        name
    });

    return redirect(`${Urls.COMPANIES}/${company.id}`);
}

export default function CreateInteractionRoute() {
    return (
        <Form method="POST" className="space-y-4 max-w-lg">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input name="name" type="text" />
            </div>
            <Button type="submit">Create company</Button>
        </Form>
    );
}
