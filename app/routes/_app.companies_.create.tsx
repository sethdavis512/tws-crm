import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { StickyHeader } from '~/components/StickyHeader';
import { createCompany } from '~/models/company.server';
import { Urls } from '~/utils/constants';

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();
    const name = form.get('name') as string;

    invariant(name, 'Name not defined');

    const interaction = await createCompany({
        name
    });

    return redirect(`${Urls.COMPANIES}/${interaction.id}`);
}

export default function CreateInteractionRoute() {
    return (
        <div className="col-span-10">
            <StickyHeader text="Create company" />
            <div className="p-4">
                <Form method="POST" className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input name="name" type="text" />
                    </div>
                    <Button type="submit">Create company</Button>
                </Form>
            </div>
        </div>
    );
}
