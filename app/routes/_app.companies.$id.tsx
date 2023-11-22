import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import dayjs from 'dayjs';
import invariant from 'tiny-invariant';
import { Badge } from '~/components/Badge';
import { Button } from '~/components/Button';
import DeleteButton from '~/components/DeleteButton';
import Heading from '~/components/Heading';
import { Label } from '~/components/Label';
import { Textarea } from '~/components/Textarea';
import {
    addCommentToCompany,
    deleteCompany,
    getCompany
} from '~/models/company.server';
import { formatTheDate } from '~/utils';

export async function loader({ params }: LoaderFunctionArgs) {
    const companyId = params.id;
    invariant(companyId, 'Customer ID not found');

    const companyDetails = await getCompany({ id: companyId });

    return json({
        companyDetails
    });
}

export async function action({ request, params }: ActionFunctionArgs) {
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

        await addCommentToCompany({ id, comment });

        return null;
    } else {
        return null;
    }
}

export default function CompanyDetailsRoute() {
    const { companyDetails } = useLoaderData<typeof loader>();

    return (
        <div className="p-8 space-y-4">
            <div className="flex justify-between">
                <Heading>{companyDetails?.name}</Heading>
                <Form method="POST">
                    <input
                        type="hidden"
                        name="interactionId"
                        value={companyDetails?.id}
                    />
                    <DeleteButton />
                </Form>
            </div>
            <div className="flex flex-col gap-2">
                <div>
                    Created:{' '}
                    <Badge variant="primary">
                        {dayjs(companyDetails?.createdAt).format(
                            'MMMM D, YYYY h:mm A'
                        )}
                    </Badge>
                </div>
                {!dayjs(companyDetails?.createdAt).isSame(
                    companyDetails?.updatedAt
                ) && (
                    <div>
                        Last updated:{' '}
                        <Badge variant="primary">
                            {formatTheDate(companyDetails?.updatedAt as string)}
                        </Badge>
                    </div>
                )}
            </div>

            <Heading>Customers</Heading>
            <ul>
                {companyDetails?.customers.map((customer) => (
                    <li key={customer.id} className="mb-2">
                        {customer.firstName} {customer.lastName}
                    </li>
                ))}
            </ul>

            <hr />

            <Heading>Comments</Heading>
            {companyDetails?.comments && companyDetails?.comments.length > 0 ? (
                <ul className="list-disc list-inside">
                    {companyDetails?.comments.map((comment) => (
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
