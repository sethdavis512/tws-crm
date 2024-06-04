import type { ActionFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { ScrollyColumn } from '~/components/ScrollyColumn';
import { ScrollyPanel } from '~/components/ScrollyPanel';
import { getAllCompanies } from '~/models/company.server';
import { createCustomer } from '~/models/customer.server';
import { Urls } from '~/utils/constants';

export async function loader() {
    const allCompanies = await getAllCompanies();

    return json({
        allCompanies,
    });
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();

    const firstName = form.get('firstName') as string;
    const lastName = form.get('lastName') as string;
    const companyIDs = form.get('companyIDs') as string;

    invariant(firstName, 'First name not defined');
    invariant(lastName, 'Last name not defined');
    invariant(companyIDs, 'companyIDs not defined');

    const customer = await createCustomer({
        firstName,
        lastName,
        companyIDs: [companyIDs],
    });

    return redirect(`${Urls.CUSTOMERS}/${customer.id}`);
}

export default function CreateInteractionRoute() {
    const { allCompanies } = useLoaderData<typeof loader>();

    return (
        <ScrollyColumn as="main" className="col-span-10">
            <ScrollyPanel heading="Create new customer" padded>
                <Form method="POST" className="max-w-lg space-y-4">
                    <div>
                        <Label htmlFor="firstName">First name</Label>
                        <Input name="firstName" type="text" />
                    </div>
                    <div>
                        <Label htmlFor="lastName">Last name</Label>
                        <Input name="lastName" type="text" />
                    </div>
                    <div>
                        <Label htmlFor="companyIDs">Company</Label>
                        <select
                            name="companyIDs"
                            className="rounded-md dark:bg-zinc-900"
                        >
                            {allCompanies.map((company) => (
                                <option value={company.id} key={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit">Create customer</Button>
                </Form>
            </ScrollyPanel>
        </ScrollyColumn>
    );
}
