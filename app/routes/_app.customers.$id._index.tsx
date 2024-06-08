import { Button, Input } from '@lemonsqueezy/wedges';
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
        .select('*')
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
                            value={customer?.name}
                        />
                        <Input
                            label="Email"
                            name="email"
                            value={customer?.email}
                        />
                        <Input
                            label="Phone"
                            name="phone_number"
                            value={customer?.phone_number}
                        />
                        <Button type="submit" name="intent" value="update">
                            Update
                        </Button>
                    </div>
                </Form>
            ) : (
                <div className="space-y-4">
                    <p>
                        <strong>Email:</strong>
                        <br />
                        {customer?.email ? (
                            customer.email
                        ) : (
                            <span className="italic opacity-40">
                                {'— email is unavailable —'}
                            </span>
                        )}
                    </p>
                    <p>
                        <strong>Phone number:</strong>
                        <br />
                        {customer?.phone_number ? (
                            customer.phone_number
                        ) : (
                            <span className="italic opacity-40">
                                {'— Phone number is unavailable —'}
                            </span>
                        )}
                    </p>
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
