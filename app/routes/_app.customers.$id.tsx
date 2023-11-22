import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import invariant from 'tiny-invariant';
import { Badge } from '~/components/Badge';
import { Button } from '~/components/Button';
import DeleteButton from '~/components/DeleteButton';
import Heading from '~/components/Heading';
import InteractionCard from '~/components/InteractionCard';
import { Label } from '~/components/Label';
import { Textarea } from '~/components/Textarea';
import {
    addCommentToCustomer,
    deleteCustomer,
    getCustomer
} from '~/models/customer.server';
import { formatTheDate } from '~/utils';

export async function loader({ params }: LoaderFunctionArgs) {
    const customerId = params.id;
    invariant(customerId, 'Customer ID not found');

    const customerDetails = await getCustomer({ id: customerId });

    return json({
        customerDetails
    });
}

export async function action({ request, params }: ActionFunctionArgs) {
    const { id } = params;
    const form = await request.formData();
    const intent = form.get('intent');

    if (intent === 'delete') {
        const customerId = form.get('customerId') as string;
        invariant(customerId, 'ID doesnt exist');

        await deleteCustomer({ id: customerId });
    } else if (intent === 'create') {
        const comment = form.get('comment') as string;
        invariant(comment, 'Comment doesnt exist');
        invariant(id, 'ID doesnt exist');

        await addCommentToCustomer({ id, comment });

        return null;
    } else {
        return null;
    }
}

export default function InteractionDetailsRoute() {
    const { customerDetails } = useLoaderData<typeof loader>();
    const [openInteraction, setOpenInteraction] = useState<string | null>(null);

    return (
        <div className="py-4 pl-8 pr-8 space-y-4">
            <div className="flex justify-between">
                <Heading>
                    {customerDetails?.firstName} {customerDetails?.lastName}
                </Heading>
                <Form method="POST">
                    <input
                        type="hidden"
                        name="interactionId"
                        value={customerDetails?.id}
                    />
                    <DeleteButton />
                </Form>
            </div>
            <div>
                Created:{' '}
                <Badge variant="primary">
                    {dayjs(customerDetails?.createdAt).format(
                        'MMMM D, YYYY h:mm A'
                    )}
                </Badge>
                {!dayjs(customerDetails?.createdAt).isSame(
                    customerDetails?.updatedAt
                ) && (
                    <>
                        Last updated:{' '}
                        <Badge variant="primary">
                            {formatTheDate(
                                customerDetails?.updatedAt as string
                            )}
                        </Badge>
                    </>
                )}
            </div>

            <Heading>Interactions</Heading>
            {customerDetails?.interactions &&
            customerDetails?.interactions.length > 0 ? (
                <ul>
                    {customerDetails?.interactions.map((interaction) => (
                        <li key={interaction.id} className="mb-4">
                            <InteractionCard
                                createdAt={interaction.createdAt}
                                more={openInteraction === interaction.id}
                                toggle={() => {
                                    if (openInteraction === interaction.id) {
                                        setOpenInteraction(null);
                                    } else {
                                        setOpenInteraction(interaction.id);
                                    }
                                }}
                                heading={interaction.title}
                                description={interaction.description}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No interactions have been recorded</p>
            )}

            <Heading>Comments</Heading>
            {customerDetails?.comments &&
            customerDetails?.comments.length > 0 ? (
                <ul className="list-disc list-inside">
                    {customerDetails?.comments.map((comment) => (
                        <li key={comment.id}>
                            {comment.text} -{' '}
                            <span className="text-gray-500">
                                {formatTheDate(comment.createdAt)}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments</p>
            )}
            <Form method="POST">
                <Label htmlFor="addComment">Add comment</Label>
                <Textarea id="addComment" name="comment" className="mb-4" />
                <Button name="intent" value="create">
                    Add comment
                </Button>
            </Form>
        </div>
    );
}
