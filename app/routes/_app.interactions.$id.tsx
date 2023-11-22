import { useReducer } from 'react';
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
import Tabs from '~/components/Tabs';
import Tab from '~/components/Tab';
import TabsList from '~/components/TabsList';
import TabPanels from '~/components/TabPanels';
import TabPanel from '~/components/TabPanel';
import { Urls } from '~/utils/constants';
import DeleteButton from '~/components/DeleteButton';
import ReadMoreButton from '~/components/ReadMoreButton';
import Heading from '~/components/Heading';

export async function loader({ params }: LoaderFunctionArgs) {
    const interactionId = params.id;
    invariant(interactionId, 'Interaction ID not found');

    const interactionDetails = await getInteraction({ id: interactionId });

    return json({
        interactionDetails
    });
}

export async function action({ request, params }: ActionFunctionArgs) {
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

        await addCommentToInteraction({ id, comment });

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
                    <DeleteButton />
                </Form>
            </div>

            <div className="space-y-2 mb-8">
                <div>
                    Creator:{' '}
                    <Badge variant="tertiary">
                        {interactionDetails?.createdBy?.profile.firstName}{' '}
                        {interactionDetails?.createdBy?.profile.lastName}
                    </Badge>
                </div>
                <div>
                    Customer:{' '}
                    <Badge variant="secondary">
                        {interactionDetails?.customer.firstName}{' '}
                        {interactionDetails?.customer.lastName}
                    </Badge>
                </div>
                <div>
                    Created:{' '}
                    <Badge variant="primary">
                        {formatTheDate(interactionDetails?.createdAt as string)}
                    </Badge>
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
                                    more={isDescriptionExpanded}
                                    onClick={toggleIsDescriptionExpanded}
                                />
                            )}
                    </TabPanel>
                    <TabPanel>
                        {interactionDetails?.comments &&
                        interactionDetails?.comments.length > 0 ? (
                            <ul className="list-disc list-inside mb-8">
                                {interactionDetails?.comments.map((comment) => (
                                    <li key={comment.id}>
                                        {comment.text} -{' '}
                                        <span className="text-gray-500">
                                            {formatTheDate(comment.createdAt)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
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
                            />
                            <Button name="intent" value="create">
                                Add comment
                            </Button>
                        </Form>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}
