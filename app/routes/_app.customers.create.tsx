import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { Button } from '~/components/Button';
import { Heading } from '~/components/Heading';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { getAllCompanies } from '~/models/company.server';
import { createCustomer } from '~/models/customer.server';
import { Urls } from '~/utils/constants';

export async function loader({ request }: LoaderFunctionArgs) {
    const allCompanies = await getAllCompanies();

    return json({
        allCompanies
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
        companyIDs: [companyIDs]
    });

    return redirect(`${Urls.CUSTOMERS}/${customer.id}`);
}

export default function CreateInteractionRoute() {
    const { allCompanies } = useLoaderData<typeof loader>();

    return (
        <div className="col-span-4 p-8">
            <Heading>Create new customer</Heading>
            <Form method="POST" className="space-y-4">
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
                        className="dark:bg-gray-800 rounded-md"
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
        </div>
    );
}
