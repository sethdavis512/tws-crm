import { useReducer, useState } from 'react';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import dayjs from 'dayjs';
import invariant from 'tiny-invariant';

import { Badge } from '~/components/Badge';
import { Button } from '~/components/Button';
import { Label } from '~/components/Label';
import { Textarea } from '~/components/Textarea';
import {
    addCommentToInteraction,
    deleteInteraction,
    getInteraction
} from '~/models/interaction.server';
import { formatTheDate } from '~/utils';
import { Tabs } from '~/components/Tabs';
import { Tab } from '~/components/Tab';
import { TabsList } from '~/components/TabsList';
import { TabPanels } from '~/components/TabPanels';
import { TabPanel } from '~/components/TabPanel';
import { Urls } from '~/utils/constants';
import { DeleteButton } from '~/components/DeleteButton';
import { ReadMoreButton } from '~/components/ReadMoreButton';
import { Heading } from '~/components/Heading';
import { CommentsSection } from '~/components/CommentsSection';
import { getUserId } from '~/utils/auth.server';
import { EditButton } from '~/components/EditButton';
import { Stack } from '~/components/Stack';

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
    const { id } = params;
    const form = await request.formData();
    const intent = form.get('intent');

    if (intent === 'delete') {
        const interactionId = form.get('interactionId') as string;
        invariant(interactionId, 'ID doesnt exist');

        await deleteInteraction({ id: interactionId });

        return redirect(Urls.INTERACTIONS);
    } else if (intent === 'create') {
        const comment = form.get('comment') as string;
        invariant(comment, 'Comment doesnt exist');
        invariant(id, 'ID doesnt exist');
        invariant(userId, 'userId doesnt exist');

        await addCommentToInteraction({ id, comment, userId });

        return null;
    } else {
        return null;
    }
}

export default function InteractionDetailsRoute() {
    const [isDescriptionExpanded, toggleIsDescriptionExpanded] = useReducer(
        (s) => !s,
        false
    );
    const { interactionDetails } = useLoaderData<typeof loader>();
    const numberOfComments = interactionDetails?.comments.length;

    const [commentValue, setCommentValue] = useState('');

    return (
        <div className="p-8">
            <div className="flex justify-between">
                <div>
                    <Heading>{interactionDetails?.title}</Heading>
                </div>
                <Form method="POST">
                    <input
                        type="hidden"
                        name="interactionId"
                        value={interactionDetails?.id}
                    />
                    <Stack>
                        <EditButton
                            to={`${Urls.INTERACTIONS}/${interactionDetails?.id}/edit`}
                        />
                        <DeleteButton />
                    </Stack>
                </Form>
            </div>

            <div className="space-y-2 mb-8">
                {interactionDetails?.type && (
                    <div>
                        Type:{' '}
                        <Badge variant="primary">
                            {interactionDetails?.type}
                        </Badge>
                    </div>
                )}
                <div>
                    Creator:{' '}
                    <Badge variant="primary">
                        {interactionDetails?.createdBy?.profile.firstName}{' '}
                        {interactionDetails?.createdBy?.profile.lastName}
                    </Badge>
                </div>
                <div>
                    Customer:{' '}
                    <Badge variant="primary">
                        {interactionDetails?.customer.firstName}{' '}
                        {interactionDetails?.customer.lastName}
                    </Badge>
                </div>
                <div>
                    Created:{' '}
                    <Badge variant="primary">
                        {formatTheDate(interactionDetails?.createdAt as string)}
                    </Badge>
                </div>
                {!dayjs(interactionDetails?.createdAt).isSame(
                    interactionDetails?.updatedAt
                ) && (
                    <div>
                        Last updated:{' '}
                        <Badge variant="primary">
                            {formatTheDate(
                                interactionDetails?.updatedAt as string
                            )}
                        </Badge>
                    </div>
                )}
            </div>

            <Tabs>
                <TabsList>
                    <Tab text="Description" />
                    <Tab text={`Comments (${numberOfComments})`} />
                </TabsList>
                <TabPanels>
                    <TabPanel>
                        <p className="mb-4">
                            {isDescriptionExpanded
                                ? interactionDetails?.description
                                : `${interactionDetails?.description.substring(
                                      0,
                                      250
                                  )}...`}
                        </p>
                        {interactionDetails?.description &&
                            interactionDetails?.description.length > 250 && (
                                <ReadMoreButton
                                    show={isDescriptionExpanded}
                                    onClick={toggleIsDescriptionExpanded}
                                />
                            )}
                    </TabPanel>
                    <TabPanel>
                        {interactionDetails?.comments &&
                        interactionDetails?.comments.length > 0 ? (
                            <CommentsSection
                                comments={interactionDetails.comments}
                            />
                        ) : (
                            <div className="mt-4 mb-8 italic">
                                <p>No comments to display...</p>
                            </div>
                        )}

                        <Form method="POST">
                            <Label htmlFor="addComment">Add comment</Label>
                            <Textarea
                                id="addComment"
                                name="comment"
                                className="mb-4"
                                value={commentValue}
                                onChange={(
                                    event: React.ChangeEvent<HTMLTextAreaElement>
                                ) => setCommentValue(event.currentTarget.value)}
                            />
                            <Button
                                name="intent"
                                value="create"
                                variant="primary"
                                size="md"
                                disabled={!commentValue}
                            >
                                Add comment
                            </Button>
                        </Form>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}
