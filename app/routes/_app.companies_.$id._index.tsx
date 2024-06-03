import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getCompany } from '~/models/company.server';

export async function loader({ params }: LoaderFunctionArgs) {
    const company = await getCompany({ id: params.id! });

    return json({
        company
    });
}

export async function action({ request }: ActionFunctionArgs) {
    // const form = await request.formData();
    return null;
}

export default function CompanyDetailsIndexRoute() {
    const data = useLoaderData<typeof loader>();

    return <div className="">{JSON.stringify(data, null, 4)}</div>;
}
