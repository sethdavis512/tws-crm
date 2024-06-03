import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { ScrollyColumn } from '~/components/ScrollyColumn';
import { ScrollyPanel } from '~/components/ScrollyPanel';
import { getCompany, updateCompany } from '~/models/company.server';
import { Urls } from '~/utils/constants';

export async function loader({ params }: LoaderFunctionArgs) {
    invariant(params.id, 'ID param not found');
    const companyDetails = await getCompany({ id: params.id });

    return json({
        companyDetails
    });
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();

    const companyId = form.get('companyId') as string;
    const name = form.get('name') as string;

    invariant(companyId, 'Company ID not defined');
    invariant(name, 'Name not defined');

    const companyObj = await updateCompany({
        id: companyId,
        name
    });

    return redirect(`${Urls.COMPANIES}/${companyObj.id}`);
}

export default function EditCaseRoute() {
    const { companyDetails } = useLoaderData<typeof loader>();

    return (
        <ScrollyColumn size={4}>
            <ScrollyPanel heading="Edit company" padded>
                <Form method="POST" className="space-y-4 max-w-lg">
                    <div>
                        <input
                            type="hidden"
                            value={companyDetails?.id}
                            name="companyId"
                        />
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            defaultValue={companyDetails?.name}
                        />
                    </div>

                    <Button type="submit">Update</Button>
                </Form>
            </ScrollyPanel>
        </ScrollyColumn>
    );
}
