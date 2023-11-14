import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import PageGrid from '~/components/PageGrid';
import { getAllCompanies } from '~/models/company.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const companiesData = await getAllCompanies();

    return json({
        companiesData
    });
}

export default function CompaniesRoute() {
    const { companiesData } = useLoaderData<typeof loader>();

    return (
        <PageGrid>
            {companiesData && companiesData.length > 0 ? (
                companiesData.map((company) => (
                    <div
                        key={company.id}
                        className="bg-white border-b border-b-gray-200 dark:bg-gray-800 dark:border-gray-700"
                    >
                        <Link
                            className="block p-4 text-lg font-bold tracking-tight text-gray-900 dark:text-white"
                            to={company.id}
                        >
                            {company.name}
                        </Link>
                    </div>
                ))
            ) : (
                <div className="p-8">
                    No companies yet.{' '}
                    <Link to="create" className="text-cyan-500">
                        Create one.
                    </Link>
                </div>
            )}
        </PageGrid>
    );
}
