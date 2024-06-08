import { Button, Checkbox, Input } from '@lemonsqueezy/wedges';
import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, useNavigation } from '@remix-run/react';
import { useState, useRef, useEffect } from 'react';
import invariant from 'tiny-invariant';

import { Urls } from '~/constants';
import { getSupabaseWithHeaders } from '~/utils/supabase.server';

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();
    const createAnother = Boolean(form.get('createAnother'));

    const name = String(form.get('name'));
    invariant(name, 'Name not defined');

    const email = String(form.get('email'));
    invariant(email, 'Email not defined');

    const phoneNumber = String(form.get('phoneNumber'));
    invariant(phoneNumber, 'Phone number not defined');

    const { supabase } = await getSupabaseWithHeaders({
        request,
    });
    const { data, error } = await supabase
        .from('customer')
        .insert([{ name, email, phone_number: phoneNumber }])
        .select();

    if (error) {
        console.error(error);
    }

    if (createAnother) {
        return null;
    }

    return redirect(`${Urls.CUSTOMERS}/${data![0].id}`);
}

export default function CreateCustomerRoute() {
    const formRef = useRef<HTMLFormElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const [quickCreateEnabled, setQuickCreateEnabled] = useState(false);
    const navigation = useNavigation();

    const isAdding =
        navigation.state === 'submitting' &&
        navigation.formData?.get('intent') === 'create';

    useEffect(() => {
        if (!isAdding) {
            formRef.current?.reset();
            nameInputRef.current?.focus();
        }
    }, [isAdding]);

    return (
        <Form method="POST" className="max-w-lg space-y-4" ref={formRef}>
            <Input label="Name" name="name" ref={nameInputRef} />
            <Input label="Email" name="email" />
            <Input label="Phone number" name="phoneNumber" />
            <Checkbox
                label="Quick create?"
                name="createAnother"
                checked={quickCreateEnabled}
                onCheckedChange={(checked) => setQuickCreateEnabled(!!checked)}
            />
            <Button type="submit" name="intent" value="create">
                Create
            </Button>
        </Form>
    );
}
