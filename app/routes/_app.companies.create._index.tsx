import { useEffect, useRef } from 'react';
import { redirect } from '@remix-run/node';
import { Form, useNavigation } from '@remix-run/react';
import type { ActionFunctionArgs } from '@remix-run/node';
import { Button, Checkbox, Input } from '@lemonsqueezy/wedges';
import invariant from 'tiny-invariant';

import { Urls } from '~/constants';
import { getSupabaseWithHeaders } from '~/utils/supabase.server';

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();
    const createAnother = Boolean(form.get('createAnother'));

    const name = String(form.get('name'));
    invariant(name, 'Name not defined');

    const description = String(form.get('description'));
    invariant(description, 'Description not defined');

    const phoneNumber = String(form.get('phoneNumber'));
    invariant(phoneNumber, 'Phone number not defined');

    const { supabase } = await getSupabaseWithHeaders({
        request,
    });

    const { data, error } = await supabase
        .from('company')
        .insert([{ name, description, phone_number: phoneNumber }])
        .select();

    if (error) {
        console.error(error);
    }

    if (createAnother) {
        return null;
    }

    return redirect(`${Urls.COMPANIES}/${data![0].id}`);
}

export default function CreateCompanyRoute() {
    const formRef = useRef<HTMLFormElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

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
            <Input label="Name" name="name" type="text" ref={nameInputRef} />
            <Input label="Description" name="description" type="text" />
            <Input label="Phone number" name="phoneNumber" type="text" />
            <Checkbox label="Quick create?" name="createAnother" />
            <Button type="submit" name="intent" value="create">
                Create
            </Button>
        </Form>
    );
}
