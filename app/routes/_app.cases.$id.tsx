import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import dayjs from 'dayjs';
import invariant from 'tiny-invariant';
import { Badge } from '~/components/Badge';
import { Button } from '~/components/Button';
import { Label } from '~/components/Label';
import { Textarea } from '~/components/Textarea';
import { addCommentToCase, deleteCase, getCase } from '~/models/case.server';
import { formatTheDate } from '~/utils';
import Tabs from '~/components/Tabs';
import Tab from '~/components/Tab';
import TabsList from '~/components/TabsList';
import TabPanels from '~/components/TabPanels';
import TabPanel from '~/components/TabPanel';
import { BORDER_BOTTOM_COLORS, Urls } from '~/utils/constants';
import { useToggle } from '~/hooks/useToggle';
import Modal from '~/components/Modal';
import { LinkButton } from '~/components/LinkButton';
import { ChevronRight } from 'lucide-react';
import DeleteButton from '~/components/DeleteButton';
import ReadMoreButton from '~/components/ReadMoreButton';
import Heading from '~/components/Heading';

export async function loader({ params }: LoaderFunctionArgs) {
    const caseId = params.id;
    invariant(caseId, 'Case ID not found');

    const caseDetails = await getCase({ id: caseId });

    return json({
        caseDetails
    });
}

export async function action({ request, params }: ActionFunctionArgs) {
    const { id } = params;
    const form = await request.formData();
    const intent = form.get('intent');

    if (intent === 'delete') {
        const caseId = form.get('caseId') as string;
        invariant(caseId, 'ID doesnt exist');

        await deleteCase({ id: caseId });

        return redirect(Urls.INTERACTIONS);
    } else if (intent === 'create') {
        const comment = form.get('comment') as string;
        invariant(comment, 'Comment doesnt exist');
        invariant(id, 'ID doesnt exist');

        await addCommentToCase({ id, comment });

        return null;
    } else {
        return null;
    }
}

export default function CasesDetailsRoute() {
    const [isDescriptionExpanded, toggleIsDescriptionExpanded] = useToggle();
    const [isModalOpen, toggleIsModalOpen] = useToggle();
    const { caseDetails } = useLoaderData<typeof loader>();
    const numberOfInteractions = caseDetails?.interactions.length;
    const numberOfComments = caseDetails?.comments.length;

    return (
        <div className="p-8">
            <div className="flex justify-between">
                <div>
                    <Heading>{caseDetails?.title}</Heading>
                </div>
                <Form method="POST">
                    <input
                        type="hidden"
                        name="caseId"
                        value={caseDetails?.id}
                    />
                    <DeleteButton />
                </Form>
            </div>

            <div className="space-y-2 mb-8">
                <div>
                    Creator:{' '}
                    <Badge variant="tertiary">
                        {caseDetails?.createdBy?.profile.firstName}{' '}
                        {caseDetails?.createdBy?.profile.lastName}
                    </Badge>
                </div>

                <div>
                    Created:{' '}
                    <Badge variant="primary">
                        {formatTheDate(caseDetails?.createdAt as string)}
                    </Badge>
                    {!dayjs(caseDetails?.createdAt).isSame(
                        caseDetails?.updatedAt
                    ) && (
                        <div>
                            Last updated:{' '}
                            <Badge variant="primary">
                                {formatTheDate(
                                    caseDetails?.updatedAt as string
                                )}
                            </Badge>
                        </div>
                    )}
                </div>
            </div>

            <Tabs>
                <TabsList>
                    <Tab text="Description" />
                    <Tab text={`Interactions (${numberOfInteractions})`} />
                    <Tab text={`Comments (${numberOfComments})`} />
                </TabsList>
                <TabPanels>
                    <TabPanel>
                        <p className="mb-4">
                            {isDescriptionExpanded
                                ? caseDetails?.description
                                : `${caseDetails?.description.substring(
                                      0,
                                      250
                                  )}...`}
                        </p>
                        {caseDetails?.description &&
                            caseDetails?.description.length > 250 && (
                                <ReadMoreButton
                                    more={isDescriptionExpanded}
                                    onClick={toggleIsDescriptionExpanded}
                                />
                            )}
                    </TabPanel>
                    <TabPanel>
                        <ul>
                            {caseDetails?.interactions &&
                            caseDetails?.interactions.length > 0 ? (
                                caseDetails?.interactions.map((interaction) => (
                                    <li
                                        key={interaction.id}
                                        className={`mb-4 ${BORDER_BOTTOM_COLORS}`}
                                    >
                                        <Heading>{interaction.title}</Heading>
                                        <p className="mb-4">
                                            {interaction.description.slice(
                                                0,
                                                100
                                            )}
                                        </p>
                                        <LinkButton
                                            className="mb-4 inline-flex gap-2 items-center"
                                            to={`${Urls.INTERACTIONS}/${interaction.id}`}
                                        >
                                            Go to interaction <ChevronRight />
                                        </LinkButton>
                                    </li>
                                ))
                            ) : (
                                <>
                                    <p className="italic">
                                        No interactions have been associated.
                                    </p>
                                    <Button onClick={toggleIsModalOpen}>
                                        Associate interaction
                                    </Button>
                                </>
                            )}
                        </ul>
                    </TabPanel>
                    <TabPanel>
                        {caseDetails?.comments &&
                        caseDetails?.comments.length > 0 ? (
                            <ul className="list-disc list-inside mb-8">
                                {caseDetails?.comments.map((comment: any) => (
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

            <Modal
                isOpen={isModalOpen}
                heading="Associate interactions"
                closeModal={toggleIsModalOpen}
            >
                Hi
            </Modal>
        </div>
    );
}
