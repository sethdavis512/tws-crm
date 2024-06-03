import type { ActionFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { ScrollyColumn } from '~/components/ScrollyColumn';
import { ScrollyPanel } from '~/components/ScrollyPanel';
import { Select } from '~/components/Select';
import { Textarea } from '~/components/Textarea';
import { createCase } from '~/models/case.server';
import { getAllCompanies } from '~/models/company.server';
import { getAllCustomers } from '~/models/customer.server';
import { Urls } from '~/utils/constants';

export async function loader() {
    const allCompanies = await getAllCompanies();
    const allCustomers = await getAllCustomers();

    return json({
        allCompanies,
        allCustomers
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

    const caseObj = await createCase({
        title,
        description,
        companyIDs: companies,
        userId: ''
    });

    return redirect(`${Urls.CASES}/${caseObj.id}`);
}

export default function CreateCaseRoute() {
    const { allCompanies, allCustomers } = useLoaderData<typeof loader>();

    return (
        <ScrollyColumn>
            <ScrollyPanel heading="Create case" padded>
                <Form method="POST" className="space-y-4 max-w-lg">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input name="title" type="text" />
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea name="description" />
                    </div>

                    <div>
                        <Label htmlFor="customerId">Customer</Label>
                        <Select id="customerId" name="customerId">
                            {allCustomers.map((customer) => (
                                <option value={customer.id} key={customer.id}>
                                    {customer.id}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="companyId">Company</Label>
                        <Select id="companyId" name="companyId">
                            {allCompanies.map((company) => (
                                <option value={company.id} key={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <Button type="submit">Create interaction</Button>
                </Form>
            </ScrollyPanel>
        </ScrollyColumn>
    );
}
