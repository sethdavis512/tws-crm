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
                <Heading>{interactionDetails?.title}</Heading>
                <Form method="POST">
                    <Stack>
                        <EditButton
                            to={`${Urls.INTERACTIONS}/${interactionDetails?.id}/edit`}
                        />
                        <DeleteButton />
                    </Stack>
                </Form>
            </div>
            <Stack vertical className="mb-4">
                {interactionDetails?.type && (
                    <div>
                        Type: <Badge>{interactionDetails?.type}</Badge>
                    </div>
                )}
                <div>
                    Creator:{' '}
                    <Badge>
                        {interactionDetails?.createdBy?.profile.firstName}{' '}
                        {interactionDetails?.createdBy?.profile.lastName}
                    </Badge>
                </div>
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
                        {formatTheDate(interactionDetails?.createdAt as string)}
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
