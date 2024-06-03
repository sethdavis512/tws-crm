import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { BORDER_COLORS } from '~/constants';
import { getAllCompanies } from '~/models/company.server';

export async function loader() {
    const companies = await getAllCompanies();

    return json({
        companies
    });
}

export default function CompaniesIndexRoute() {
    const { companies } = useLoaderData<typeof loader>();

    return (
        <ol className="space-y-4 list-decimal list-inside">
            {companies.map((company) => (
                <li
                    key={company.id}
                    className={`${BORDER_COLORS} rounded-lg p-4`}
                >
                    <Link to={company.id} className="hover:text-primary-500">
                        {company.name}
                    </Link>
                </li>
            ))}
        </ol>
    );
}
