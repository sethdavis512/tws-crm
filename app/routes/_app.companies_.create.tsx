import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { ScrollyColumn } from '~/components/ScrollyColumn';
import { ScrollyPanel } from '~/components/ScrollyPanel';
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
        <ScrollyColumn as="main" className="col-span-10">
            <ScrollyPanel text="Create company" padded>
                <Form method="POST" className="space-y-4 max-w-lg">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input name="name" type="text" />
                    </div>
                    <Button type="submit">Create company</Button>
                </Form>
            </ScrollyPanel>
        </ScrollyColumn>
    );
}
