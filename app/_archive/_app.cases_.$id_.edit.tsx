import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { ScrollyColumn } from '~/components/ScrollyColumn';
import { ScrollyPanel } from '~/components/ScrollyPanel';
import { Textarea } from '~/components/Textarea';
import { getCase, updateCase } from '~/models/case.server';
import { Urls } from '~/utils/constants';

export async function loader({ params }: LoaderFunctionArgs) {
    invariant(params.id, 'ID param not found');
    const caseDetails = await getCase({ id: params.id });

    return json({
        caseDetails,
    });
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();

    const caseId = form.get('caseId') as string;
    const title = form.get('title') as string;
    const description = form.get('description') as string;

    invariant(caseId, 'Case ID not defined');
    invariant(title, 'Title not defined');
    invariant(description, 'Description not defined');

    const caseObj = await updateCase({
        id: caseId,
        title,
        description,
    });

    return redirect(`${Urls.CASES}/${caseObj.id}`);
}

export default function EditCaseRoute() {
    const { caseDetails } = useLoaderData<typeof loader>();

    return (
        <ScrollyColumn>
            <ScrollyPanel heading="Edit case" padded>
                <Form method="POST" className="max-w-lg space-y-4">
                    <div>
                        <input
                            type="hidden"
                            value={caseDetails?.id}
                            name="caseId"
                        />
                        <Label htmlFor="title">Title</Label>
                        <Input
                            name="title"
                            type="text"
                            defaultValue={caseDetails?.title}
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            name="description"
                            defaultValue={caseDetails?.description}
                        />
                    </div>
                    <Button type="submit">Update</Button>
                </Form>
            </ScrollyPanel>
        </ScrollyColumn>
    );
}
