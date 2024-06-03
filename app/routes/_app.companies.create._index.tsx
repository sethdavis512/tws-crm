import { Button, Checkbox, Input, Label } from '@lemonsqueezy/wedges';
import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { type BaseSyntheticEvent, useState } from 'react';
import invariant from 'tiny-invariant';

import { Urls } from '~/utils/constants';
import { getSupabaseWithHeaders } from '~/utils/supabase.server';

export async function action({ request }: ActionFunctionArgs) {
    const form = await request.formData();
    const name = String(form.get('name'));
    const createAnother = Boolean(form.get('createAnother'));

    invariant(name, 'Name not defined');

    const { supabase } = await getSupabaseWithHeaders({
        request
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

    return (
        <Form
            method="POST"
            className="space-y-4 max-w-lg"
            onSubmit={() => {
                setCompanyName('');
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
                />
            </div>
            <Checkbox label="Quick create?" name="createAnother" />
            <Button type="submit">Create</Button>
        </Form>
    );
}
