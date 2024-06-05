import { Button, Checkbox, Input, Label } from '@lemonsqueezy/wedges';
import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { type BaseSyntheticEvent, useState, useRef } from 'react';
import invariant from 'tiny-invariant';

import { Urls } from '~/constants';
import { getSupabaseWithHeaders } from '~/utils/supabase.server';

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();
    const name = String(form.get('name'));
    const createAnother = Boolean(form.get('createAnother'));

    invariant(name, 'Name not defined');

    const { supabase } = await getSupabaseWithHeaders({
        request,
    });
    const { data, error } = await supabase
        .from('company')
        .insert([{ name }])
        .select();

    if (error) {
        console.error(error);
    }

    if (createAnother) {
        return null;
    }

    return redirect(`${Urls.COMPANIES}/${data![0].id}`);
}

export default function CreateInteractionRoute() {
    const [companyName, setCompanyName] = useState('');
    const nameInputRef = useRef<HTMLInputElement>(null);

    return (
        <Form
            method="POST"
            className="max-w-lg space-y-4"
            onSubmit={() => {
                setCompanyName('');
                nameInputRef.current?.focus();
            }}
        >
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    name="name"
                    type="text"
                    value={companyName}
                    onChange={(event: BaseSyntheticEvent) =>
                        setCompanyName(event.target.value)
                    }
                    ref={nameInputRef}
                />
            </div>
            <Checkbox label="Quick create?" name="createAnother" />
            <Button type="submit">Create</Button>
        </Form>
    );
}
