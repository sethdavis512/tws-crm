import { InteractionType } from '@prisma/client';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { Button } from '~/components/Button';
import { Heading } from '~/components/Heading';
import { Input } from '~/components/Input';
import { Label } from '~/components/Label';
import { Select } from '~/components/Select';
import { Textarea } from '~/components/Textarea';
import { getInteraction, updateInteraction } from '~/models/interaction.server';
import { Urls } from '~/utils/constants';

export async function loader({ params }: LoaderFunctionArgs) {
    invariant(params.id, 'ID param not found');
    const interactionDetails = await getInteraction({ id: params.id });

    return json({
        interactionDetails
    });
}

export async function action({ request, params }: ActionFunctionArgs) {
    const { id: interactionId } = params;
    invariant(interactionId, 'Interaction ID not found');

    const form = await request.formData();

    const title = form.get('title') as string;
    const description = form.get('description') as string;
    const type = form.get('interactionType') as InteractionType;

    invariant(interactionId, 'Interaction ID not defined');
    invariant(title, 'Title not defined');
    invariant(description, 'Description not defined');
    invariant(type, 'Type not defined');

    const interactionObj = await updateInteraction({
        id: interactionId,
        title,
        description,
        type
    });

    return redirect(`${Urls.INTERACTIONS}/${interactionObj.id}`);
}

export default function EditInteractionRoute() {
    const { interactionDetails } = useLoaderData<typeof loader>();

    return (
        <div className="col-span-4 py-4 pl-8 pr-8">
            <Heading className="mb-8">Edit interaction</Heading>
            <Form method="POST" className="space-y-4">
                <div>
                    <Label htmlFor="interactionType">Interaction type</Label>
                    <Select id="interactionType" name="interactionType">
                        <option value={InteractionType.EMAIL}>
                            {InteractionType.EMAIL}
                        </option>
                        <option value={InteractionType.CALL}>
                            {InteractionType.CALL}
                        </option>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        name="title"
                        type="text"
                        defaultValue={interactionDetails?.title}
                    />
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        name="description"
                        defaultValue={interactionDetails?.description}
                    />
                </div>

                <Button type="submit">Update</Button>
            </Form>
        </div>
    );
}
