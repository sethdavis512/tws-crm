import { Button, Input, Label, Textarea } from '@lemonsqueezy/wedges';
import type { ActionFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { createCase } from '~/models/case.server';
import { getAllCompanies } from '~/models/company.server';
import { Urls } from '~/utils/constants';

export async function loader() {
    const allCompanies = await getAllCompanies();

    return json({
        allCompanies
    });
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();

    const title = form.get('title') as string;
    const description = form.get('description') as string;
    const companies: string[] = []; // form.get('companyId') as string;
    const customerId = form.get('customerId') as string;

    invariant(title, 'Title not defined');
    invariant(description, 'Description not defined');
    invariant(customerId, 'Customer ID not defined');
    invariant(companies, 'Companies not defined');

    const interaction = await createCase({
        title,
        description,
        companyIDs: companies,
        userId: ''
    });

    return redirect(`${Urls.CASES}/${interaction.id}`);
}

export default function CreateCaseRoute() {
    const { allCompanies } = useLoaderData<typeof loader>();

    return (
        <Form method="POST" className="space-y-4 max-w-lg">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input name="title" type="text" />
            </div>

            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea name="description" />
            </div>

            {/* <div>
                <Label htmlFor="customerId">Customer</Label>
                <select id="customerId" name="customerId">
                    {allCustomers.map((customer) => (
                        <option value={customer.id} key={customer.id}>
                            {customer.id}
                        </option>
                    ))}
                </select>
            </div> */}

            <div>
                <Label htmlFor="companyId">Company</Label>
                <select id="companyId" name="companyId">
                    {allCompanies.map((company) => (
                        <option value={company.id} key={company.id}>
                            {company.name}
                        </option>
                    ))}
                </select>
            </div>

            <Button type="submit">Create interaction</Button>
        </Form>
    );
}
