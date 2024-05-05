import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useLoaderData, useNavigation } from '@remix-run/react';
import dayjs from 'dayjs';
import invariant from 'tiny-invariant';

import { Badge } from '~/components/Badge';
import { Card } from '~/components/Card';
import { CommentsSection } from '~/components/CommentsSection';
import { DeleteButton } from '~/components/DeleteButton';
import { EditButton } from '~/components/EditButton';
import { Heading } from '~/components/Heading';
import { ScrollyPanel } from '~/components/ScrollyPanel';
import { Stack } from '~/components/Stack';
import { StickyHeader } from '~/components/StickyHeader';
import { Tab } from '~/components/Tab';
import { TabPanel } from '~/components/TabPanel';
import { TabPanels } from '~/components/TabPanels';
import { Tabs } from '~/components/Tabs';
import { TabsList } from '~/components/TabsList';
import {
    addCommentToCompany,
    deleteCompany,
    getCompany
} from '~/models/company.server';
import { formatTheDate } from '~/utils';
import { getUserId } from '~/utils/auth.server';
import { Urls } from '~/utils/constants';

export async function loader({ params }: LoaderFunctionArgs) {
    const companyId = params.id;
    invariant(companyId, 'Customer ID not found');

    const companyDetails = await getCompany({ id: companyId });

    return json({
        companyDetails
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

        await deleteCompany({ id: customerId });
    } else if (intent === 'create') {
        const comment = form.get('comment') as string;
        invariant(comment, 'Comment doesnt exist');
        invariant(id, 'ID doesnt exist');
        invariant(userId, 'userId doesnt exist');

        await addCommentToCompany({ id, comment, userId });

        return null;
    } else {
        return null;
    }
}

export default function CompanyDetailsRoute() {
    const { companyDetails } = useLoaderData<typeof loader>();
    const navigation = useNavigation();

    const isLoading = navigation.state === 'loading';

    return (
        <>
            <ScrollyPanel
                aux={
                    <Form method="POST">
                        <Stack>
                            <EditButton
                                to={`${Urls.COMPANIES}/${companyDetails?.id}/edit`}
                            />
                            <DeleteButton />
                        </Stack>
                    </Form>
                }
                heading={
                    isLoading ? '...' : companyDetails?.name || 'Company name'
                }
            >
                <div className="p-4 space-y-4">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <Stack className="items-start" vertical>
                                <div>
                                    Created:{' '}
                                    <Badge>
                                        {formatTheDate(
                                            companyDetails?.createdAt as string
                                        )}
                                    </Badge>
                                </div>
                                {!dayjs(companyDetails?.createdAt).isSame(
                                    companyDetails?.updatedAt
                                ) && (
                                    <div>
                                        Last updated:{' '}
                                        <Badge>
                                            {formatTheDate(
                                                companyDetails?.updatedAt as string
                                            )}
                                        </Badge>
                                    </div>
                                )}
                            </Stack>
                            <Tabs>
                                <TabsList>
                                    <Tab
                                        text={`Customers (${companyDetails?.customers.length})`}
                                    />
                                    <Tab
                                        text={`Comments (${companyDetails?.comments.length})`}
                                    />
                                </TabsList>
                                <TabPanels>
                                    <TabPanel>
                                        <ul className="space-y-4">
                                            {companyDetails?.customers.map(
                                                (customer) => (
                                                    <li key={customer.id}>
                                                        <Card>
                                                            <header>
                                                                <Heading>
                                                                    {
                                                                        customer.firstName
                                                                    }{' '}
                                                                    {
                                                                        customer.lastName
                                                                    }
                                                                </Heading>
                                                            </header>
                                                            <section>
                                                                {
                                                                    customer.caseId
                                                                }
                                                            </section>
                                                            <footer></footer>
                                                        </Card>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </TabPanel>
                                    <TabPanel>
                                        {companyDetails?.comments &&
                                        companyDetails?.comments.length > 0 ? (
                                            <CommentsSection
                                                intentValue=""
                                                comments={
                                                    companyDetails.comments
                                                }
                                            />
                                        ) : (
                                            <p>No comments</p>
                                        )}
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </>
                    )}
                </div>
            </ScrollyPanel>
        </>
    );
}
