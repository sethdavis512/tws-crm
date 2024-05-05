import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Outlet, useLoaderData, useLocation } from '@remix-run/react';
import dayjs from 'dayjs';
import invariant from 'tiny-invariant';

import { Badge } from '~/components/Badge';
import {
    addCommentToInteraction,
    deleteInteraction,
    getInteraction
} from '~/models/interaction.server';
import { formatTheDate } from '~/utils';
import { Urls } from '~/utils/constants';
import { DeleteButton } from '~/components/DeleteButton';
import { getUserId } from '~/utils/auth.server';
import { EditButton } from '~/components/EditButton';
import { Stack } from '~/components/Stack';
import { StickyHeader } from '~/components/StickyHeader';
import { Heading } from '~/components/Heading';
import { LinkButton } from '~/components/LinkButton';

export async function loader({ params }: LoaderFunctionArgs) {
    const interactionId = params.id;
    invariant(interactionId, 'Interaction ID not found');

    const interactionDetails = await getInteraction({ id: interactionId });

    return json({
        interactionDetails
    });
}

export async function action({ request, params }: ActionFunctionArgs) {
    const userId = await getUserId(request);
    const { id: interactionId } = params;
    invariant(interactionId, 'ID doesnt exist');

    const form = await request.formData();
    const intent = form.get('intent');

    if (intent === 'delete') {
        await deleteInteraction({ id: interactionId });

        return redirect(Urls.INTERACTIONS);
    } else if (intent === 'create') {
        const comment = form.get('comment') as string;
        invariant(comment, 'Comment doesnt exist');
        invariant(userId, 'userId doesnt exist');

        await addCommentToInteraction({ id: interactionId, comment, userId });

        return null;
    } else {
        return null;
    }
}

export default function InteractionDetailsRoute() {
    const { interactionDetails } = useLoaderData<typeof loader>();

    const location = useLocation();
    const isDetailsPage = location.pathname.endsWith(
        interactionDetails?.id || ''
    );

    return (
        <>
            <div
                className={`${
                    isDetailsPage ? 'col-span-10' : 'col-span-7'
                } overflow-y-auto`}
            >
                <StickyHeader text={interactionDetails?.title || 'Interaction'}>
                    <Stack>
                        <LinkButton
                            to={
                                isDetailsPage
                                    ? 'comments'
                                    : `/interactions/${interactionDetails?.id}`
                            }
                        >
                            {`${isDetailsPage ? 'Show' : 'Hide'} comments`}
                        </LinkButton>
                        <Form method="POST">
                            <Stack>
                                <EditButton
                                    to={`${Urls.INTERACTIONS}/${interactionDetails?.id}/edit`}
                                />
                                <DeleteButton />
                            </Stack>
                        </Form>
                    </Stack>
                </StickyHeader>

                <div className="p-4">
                    <Heading className="mb-4">Meta</Heading>
                    <Stack className="mb-4 items-start">
                        {interactionDetails?.type && (
                            <div>
                                Type: <Badge>{interactionDetails?.type}</Badge>
                            </div>
                        )}
                        {interactionDetails?.createdBy && (
                            <div>
                                Creator:{' '}
                                <Badge>
                                    {
                                        interactionDetails?.createdBy?.profile
                                            .firstName
                                    }{' '}
                                    {
                                        interactionDetails?.createdBy?.profile
                                            .lastName
                                    }
                                </Badge>
                            </div>
                        )}
                        <div>
                            Customer:{' '}
                            <Badge>
                                {interactionDetails?.customer.firstName}{' '}
                                {interactionDetails?.customer.lastName}
                            </Badge>
                        </div>
                        <div>
                            Created:{' '}
                            <Badge>
                                {formatTheDate(
                                    interactionDetails?.createdAt as string
                                )}
                            </Badge>
                        </div>
                        {!dayjs(interactionDetails?.createdAt).isSame(
                            interactionDetails?.updatedAt
                        ) && (
                            <div>
                                Last updated:{' '}
                                <Badge>
                                    {formatTheDate(
                                        interactionDetails?.updatedAt as string
                                    )}
                                </Badge>
                            </div>
                        )}
                    </Stack>

                    <Heading className="mb-4">Description</Heading>
                    <p className="mb-4">{interactionDetails?.description}</p>
                </div>
            </div>
            <Outlet />
        </>
    );
}
