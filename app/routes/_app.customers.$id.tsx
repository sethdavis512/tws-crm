import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import invariant from 'tiny-invariant';

import { Badge } from '~/components/Badge';
import { CommentsSection } from '~/components/CommentsSection';
import { DeleteButton } from '~/components/DeleteButton';
import { EditButton } from '~/components/EditButton';
import { Heading } from '~/components/Heading';
import { InteractionCard } from '~/components/InteractionCard';
import { ScrollyColumn } from '~/components/ScrollyColumn';
import { ScrollyPanel } from '~/components/ScrollyPanel';
import { Stack } from '~/components/Stack';
import {
    addCommentToCustomer,
    deleteCustomer,
    getCustomer
} from '~/models/customer.server';
import { formatTheDate } from '~/utils';
import { getUserId } from '~/utils/auth.server';
import { Urls } from '~/utils/constants';

export async function loader({ params }: LoaderFunctionArgs) {
    const customerId = params.id;
    invariant(customerId, 'Customer ID not found');

    const customerDetails = await getCustomer({ id: customerId });

    return json({
        customerDetails
    });
}

export async function action({ request, params }: ActionFunctionArgs) {
    const userId = await getUserId(request);
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
        invariant(userId, 'userId doesnt exist');

        await addCommentToCustomer({ id, comment, userId });

        return null;
    } else {
        return null;
    }
}

export default function InteractionDetailsRoute() {
    const { customerDetails } = useLoaderData<typeof loader>();
    const [openInteraction, setOpenInteraction] = useState<string | null>(null);

    return (
        <ScrollyColumn size={7}>
            <ScrollyPanel
                aux={
                    <Form method="POST">
                        <input
                            type="hidden"
                            name="customerId"
                            value={customerDetails?.id}
                        />
                        <Stack>
                            <EditButton
                                to={`${Urls.CUSTOMERS}/${customerDetails?.id}/edit`}
                            />
                            <DeleteButton />
                        </Stack>
                    </Form>
                }
                heading={`${customerDetails?.firstName} ${customerDetails?.lastName}`}
                padded
            >
                <div>
                    Created:{' '}
                    <Badge>
                        {dayjs(customerDetails?.createdAt).format(
                            'MMMM D, YYYY h:mm A'
                        )}
                    </Badge>
                    {!dayjs(customerDetails?.createdAt).isSame(
                        customerDetails?.updatedAt
                    ) && (
                        <>
                            Last updated:{' '}
                            <Badge>
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
                                        if (
                                            openInteraction === interaction.id
                                        ) {
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
                    <CommentsSection
                        intentValue="create"
                        comments={customerDetails.comments}
                    />
                ) : (
                    <p>No comments</p>
                )}
            </ScrollyPanel>
        </ScrollyColumn>
    );
}
