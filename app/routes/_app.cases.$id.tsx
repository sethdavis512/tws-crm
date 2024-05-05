import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import dayjs from 'dayjs';
import invariant from 'tiny-invariant';
import { ChevronRight } from 'lucide-react';

import { Badge } from '~/components/Badge';
import { Button } from '~/components/Button';
import { Label } from '~/components/Label';
import {
    connectInteractionsToCase,
    deleteCase,
    getCase
} from '~/models/case.server';
import { formatTheDate } from '~/utils';
import { Tabs } from '~/components/Tabs';
import { Tab } from '~/components/Tab';
import { TabsList } from '~/components/TabsList';
import { TabPanels } from '~/components/TabPanels';
import { TabPanel } from '~/components/TabPanel';
import { BORDER_BOTTOM_COLORS, Urls } from '~/utils/constants';
import { useToggle } from '~/hooks/useToggle';
import { Modal } from '~/components/Modal';
import { LinkButton } from '~/components/LinkButton';
import { DeleteButton } from '~/components/DeleteButton';
import { ReadMoreButton } from '~/components/ReadMoreButton';
import { Heading } from '~/components/Heading';
import { CommentsSection } from '~/components/CommentsSection';
import { getUserId } from '~/utils/auth.server';
import { EditButton } from '~/components/EditButton';
import { Stack } from '~/components/Stack';
import { getAllInteractions } from '~/models/interaction.server';
import { Card } from '~/components/Card';
import { Checkbox } from '~/components/Checkbox';
import { Separator } from '~/components/Separator';
import { StickyHeader } from '~/components/StickyHeader';

export async function loader({ request, params }: LoaderFunctionArgs) {
    const userId = await getUserId(request);
    const caseId = params.id;
    invariant(caseId, 'Case ID not found');

    const caseDetails = await getCase({ id: caseId });
    const allInteractions = await getAllInteractions();

    return json({
        userId,
        caseDetails,
        allInteractions
    });
}

export async function action({ request, params }: ActionFunctionArgs) {
    const { id: caseId } = params;
    invariant(caseId, 'ID doesnt exist');

    const form = await request.formData();
    const intent = form.get('intent');

    if (intent === 'delete') {
        await deleteCase({ id: caseId });

        return redirect(Urls.INTERACTIONS);
    } else if (intent === 'connectInteractions') {
        const interactions = form.getAll('interaction') as string[];
        await connectInteractionsToCase({
            id: caseId,
            interactionIds: interactions
        });

        return null;
    } else {
        return null;
    }
}

export default function CasesDetailsRoute() {
    const [isDescriptionExpanded, toggleIsDescriptionExpanded] = useToggle();
    const [isModalOpen, toggleIsModalOpen] = useToggle();
    const { allInteractions, caseDetails } = useLoaderData<typeof loader>();
    const numberOfInteractions = caseDetails?.interactions.length;
    const numberOfComments = caseDetails?.comments.length;

    return (
        <>
            <StickyHeader text={caseDetails?.title || 'Case'}>
                <Form method="POST">
                    <Stack>
                        <EditButton
                            to={`${Urls.CASES}/${caseDetails?.id}/edit`}
                        />
                        <DeleteButton />
                    </Stack>
                </Form>
            </StickyHeader>

            <div className="p-4">
                <div className="space-y-2 mb-8">
                    <div>
                        Creator:{' '}
                        <Badge>
                            {caseDetails?.createdBy?.profile.firstName}{' '}
                            {caseDetails?.createdBy?.profile.lastName}
                        </Badge>
                    </div>

                    <div>
                        Created:{' '}
                        <Badge>
                            {formatTheDate(caseDetails?.createdAt as string)}
                        </Badge>
                    </div>

                    <div>
                        {!dayjs(caseDetails?.createdAt).isSame(
                            caseDetails?.updatedAt
                        ) && (
                            <div>
                                Last updated:{' '}
                                <Badge>
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
                        <TabPanel paddingY="md">
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
                                        show={isDescriptionExpanded}
                                        onClick={toggleIsDescriptionExpanded}
                                    />
                                )}
                        </TabPanel>
                        <TabPanel paddingY="md">
                            <Button onClick={toggleIsModalOpen}>
                                Connect an interaction
                            </Button>
                            <Separator />
                            <ul>
                                {caseDetails?.interactions &&
                                caseDetails?.interactions.length > 0 ? (
                                    caseDetails?.interactions.map(
                                        (interaction) => (
                                            <li
                                                key={interaction.id}
                                                className={`mb-4 ${BORDER_BOTTOM_COLORS}`}
                                            >
                                                <Heading>
                                                    {interaction.title}
                                                </Heading>
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
                                                    Go to interaction{' '}
                                                    <ChevronRight />
                                                </LinkButton>
                                            </li>
                                        )
                                    )
                                ) : (
                                    <p className="italic mb-4">
                                        No interactions have been associated.
                                    </p>
                                )}
                            </ul>
                        </TabPanel>
                        <TabPanel paddingY="md">
                            {caseDetails && caseDetails.comments ? (
                                <CommentsSection
                                    comments={caseDetails.comments}
                                    intentValue="addCommentToCase"
                                />
                            ) : (
                                <Card>
                                    <p>Comments not found...</p>
                                </Card>
                            )}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
            <Form method="POST">
                <Modal
                    isOpen={isModalOpen}
                    heading="Connect interactions"
                    closeModal={toggleIsModalOpen}
                    footer={
                        <Button
                            type="submit"
                            name="intent"
                            value="connectInteractions"
                        >
                            Submit
                        </Button>
                    }
                >
                    {allInteractions.map((interaction) => (
                        <Card key={interaction.id}>
                            <Label htmlFor={interaction.id}>
                                <Checkbox
                                    name="interaction"
                                    id={interaction.id}
                                    className="mr-3"
                                    value={interaction.id}
                                />
                                {interaction.title}
                            </Label>
                        </Card>
                    ))}
                </Modal>
            </Form>
        </>
    );
}
