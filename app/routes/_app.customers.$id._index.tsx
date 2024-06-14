import { Alert, Button, Input, Label } from '@lemonsqueezy/wedges';
import {
    redirect,
    type ActionFunctionArgs,
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
        .from('customer')
        .select(
            `
            id,
            name,
            email,
            phone_number,
            company (
                id,
                name
            )
            `
        )
        .eq('id', params.id!);

    const customer = response?.data?.shift();

    return json({ customer });
}

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();
    const { supabase } = await getSupabaseWithHeaders({ request });

    const intent = String(form.get('intent'));
    invariant(intent, 'Intent not found');

    if (intent === 'update') {
        const name = String(form.get('name'));
        invariant(name, 'Name not found');

        const customerId = String(form.get('customerId'));
        invariant(customerId, 'Customer ID not found');

        const email = String(form.get('email'));
        invariant(email, 'Email not found');

        const phone_number = String(form.get('phone_number'));
        invariant(phone_number, 'Phone number not found');

        await supabase
            .from('customer')
            .update({ name, email, phone_number })
            .eq('id', customerId)
            .select();
    }

    if (intent === 'delete') {
        const customerId = String(form.get('customerId'));
        invariant(customerId, 'Customer ID not found');

        await supabase.from('customer').delete().eq('id', customerId);

        return redirect(Urls.CUSTOMERS);
    }

    return null;
}

export default function CompanyDetailsIndexRoute() {
    const { customer } = useLoaderData<typeof loader>();
    const [isInEditMode, toggleEditMode] = useToggle();
    const [isInDeleteMode, toggleDeleteMode] = useToggle();

    return (
        <>
            <Flex className="justify-between">
                <Heading size="4" className="mb-4">
                    {customer?.name}
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
                    <input
                        type="hidden"
                        name="customerId"
                        value={customer?.id}
                    />
                    <div className="space-y-4">
                        <Input
                            label="Name"
                            name="name"
                            defaultValue={customer?.name}
                        />
                        <Input
                            label="Email"
                            name="email"
                            defaultValue={customer?.email}
                        />
                        <Input
                            label="Phone"
                            name="phone_number"
                            defaultValue={customer?.phone_number}
                        />
                        <Button type="submit" name="intent" value="update">
                            Update
                        </Button>
                    </div>
                </Form>
            ) : (
                <div className="space-y-4">
                    <Label className="font-bold">Email</Label>
                    {customer?.email ? (
                        <p>{customer.email}</p>
                    ) : (
                        <Alert id="companyPhoneNumber" color="gray">
                            {`Email not available`}
                        </Alert>
                    )}
                    <Label className="font-bold">Company</Label>
                    {customer?.company ? (
                        <p>{customer.company.name}</p>
                    ) : (
                        <Alert id="companyPhoneNumber" color="gray">
                            {`Company not available`}
                        </Alert>
                    )}
                    <Label className="font-bold">Phone number</Label>
                    {customer?.phone_number ? (
                        <p>{customer.phone_number}</p>
                    ) : (
                        <Alert id="companyPhoneNumber" color="gray">
                            {`Phone number not available`}
                        </Alert>
                    )}
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
                            name="customerId"
                            value={customer?.id}
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
