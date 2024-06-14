import { Alert, Button, Input, Label } from '@lemonsqueezy/wedges';
import {
    type ActionFunctionArgs,
    redirect,
    type LoaderFunctionArgs,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { PencilIcon, TrashIcon } from 'lucide-react';
import invariant from 'tiny-invariant';
import Flex from '~/components/Flex';
import Heading from '~/components/Heading';
import { Modal } from '~/components/Modal';
import { Urls } from '~/constants';
import { useToggle } from '~/hooks/useToggle';
import { getSupabaseWithHeaders } from '~/utils/supabase.server';

export async function loader({ request, params }: LoaderFunctionArgs) {
    const { supabase } = await getSupabaseWithHeaders({ request });
    const response = await supabase
        .from('company')
        .select('*')
        .eq('id', params.id!);

    const company = response?.data?.shift();

    return json({ company });
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();
    const { supabase } = await getSupabaseWithHeaders({ request });

    const intent = String(form.get('intent'));
    invariant(intent, 'Intent not found');

    if (intent === 'update') {
        const name = String(form.get('name'));
        invariant(name, 'Name not found');

        const companyId = String(form.get('companyId'));
        invariant(companyId, 'Company ID not found');

        const description = String(form.get('description'));
        invariant(description, 'Description not found');

        const phoneNumber = String(form.get('phoneNumber'));
        invariant(phoneNumber, 'Phone number not found');

        await supabase
            .from('company')
            .update({ name, description, phone_number: phoneNumber })
            .eq('id', companyId)
            .select();
    }

    if (intent === 'delete') {
        const companyId = String(form.get('companyId'));
        invariant(companyId, 'Company ID not found');

        await supabase.from('company').delete().eq('id', companyId);

        return redirect(Urls.COMPANIES);
    }

    return null;
}

export default function CompanyDetailsIndexRoute() {
    const { company } = useLoaderData<typeof loader>();
    const [isInEditMode, toggleEditMode] = useToggle();
    const [isInDeleteMode, toggleDeleteMode] = useToggle();

    return (
        <>
            <Flex className="justify-between">
                <Heading size="4" className="mb-4">
                    {company?.name}
                </Heading>
                <Flex>
                    <Button before={<PencilIcon />} onClick={toggleEditMode}>
                        Edit
                    </Button>
                    <Button
                        before={<TrashIcon />}
                        onClick={toggleDeleteMode}
                        destructive
                    >
                        Delete
                    </Button>
                </Flex>
            </Flex>
            {isInEditMode ? (
                <Form
                    method="POST"
                    onSubmit={() => {
                        toggleEditMode();
                    }}
                >
                    <input type="hidden" name="companyId" value={company?.id} />
                    <div className="space-y-4">
                        <Input
                            label="Name"
                            name="name"
                            defaultValue={company?.name}
                        />
                        <Input
                            label="Description"
                            name="description"
                            defaultValue={company?.description || ''}
                        />
                        <Input
                            label="Phone"
                            name="phoneNumber"
                            defaultValue={company?.phone_number}
                        />
                        <Button type="submit" name="intent" value="update">
                            Update
                        </Button>
                    </div>
                </Form>
            ) : (
                <div className="space-y-4">
                    <Label htmlFor="companyDescription" className="font-bold">
                        Description
                    </Label>
                    {company?.description ? (
                        <p id="companyDescription">{company.description}</p>
                    ) : (
                        <Alert
                            id="companyDescription"
                            color="gray"
                        >{`Description not available`}</Alert>
                    )}
                    <Label htmlFor="companyPhoneNumber" className="font-bold">
                        Phone number
                    </Label>
                    {company?.phone_number ? (
                        <p id="companyPhoneNumber">{company.phone_number}</p>
                    ) : (
                        <Alert
                            id="companyPhoneNumber"
                            color="gray"
                        >{`Phone number not available`}</Alert>
                    )}
                    {/* {company?.employees ? (
                            JSON.stringify(company?.employees)
                        ) : (
                            <span className="italic opacity-40">
                                {'— Employees is unavailable —'}
                            </span>
                        )} */}
                </div>
            )}
            <Modal
                id="customerDelete"
                handleClose={toggleDeleteMode}
                isOpen={isInDeleteMode}
                heading="Delete?"
                footer={
                    <Form
                        method="POST"
                        onSubmit={() => {
                            toggleDeleteMode();
                        }}
                    >
                        <input
                            type="hidden"
                            name="companyId"
                            value={company?.id}
                        />
                        <Flex>
                            <Button variant="outline" color="red">
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                destructive
                                name="intent"
                                value="delete"
                            >
                                Delete
                            </Button>
                        </Flex>
                    </Form>
                }
            >
                <p>Are you sure you want to delete?</p>
            </Modal>
        </>
    );
}
