import { Button, Checkbox, Input, Label } from '@lemonsqueezy/wedges';
import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { type BaseSyntheticEvent, useState, useCallback } from 'react';
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

    const { supabase } = await getSupabaseWithHeaders({
        request,
    });
    const { data, error } = await supabase
        .from('customer')
        .insert([{ name, description }])
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
    const [customerName, setCustomerName] = useState('');
    const [customerDescription, setCustomerDescription] = useState('');
    const [quickCreateEnabled, setQuickCreateEnabled] = useState(false);
    const handleOnSubmit = useCallback(() => {
        if (quickCreateEnabled) {
            setCustomerName('');
            setCustomerDescription('');
        }
    }, [quickCreateEnabled]);

    return (
        <Form
            method="POST"
            className="max-w-lg space-y-4"
            onSubmit={handleOnSubmit}
        >
            <Label htmlFor="name">Name</Label>
            <Input
                name="name"
                type="text"
                value={customerName}
                onChange={(event: BaseSyntheticEvent) =>
                    setCustomerName(event.target.value)
                }
            />
            <Label htmlFor="name">Description</Label>
            <Input
                name="description"
                type="text"
                value={customerDescription}
                onChange={(event: BaseSyntheticEvent) =>
                    setCustomerDescription(event.target.value)
                }
            />
            <Checkbox
                label="Quick create?"
                name="createAnother"
                checked={quickCreateEnabled}
                onCheckedChange={(checked) => setQuickCreateEnabled(!!checked)}
            />
            <Button type="submit">Create</Button>
        </Form>
    );
}
