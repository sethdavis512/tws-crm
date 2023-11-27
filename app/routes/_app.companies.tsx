import { json } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';

import { AppLayout } from '~/components/AppLayout';
import { Heading } from '~/components/Heading';
import { NewButtonLink } from '~/components/NewButtonLink';
import { StickyHeader } from '~/components/StickyHeader';
import { getAllCompanies } from '~/models/company.server';
import { getPanelLinkClassName } from '~/utils/css';

export async function loader() {
    const companiesData = await getAllCompanies();

    return json({
        companiesData
    });
}

export default function CompaniesRoute() {
    const { id: companyIdParam } = useParams();
    const { companiesData } = useLoaderData<typeof loader>();

    return (
        <AppLayout>
            <StickyHeader text="Companies">
                <NewButtonLink to="create" />
            </StickyHeader>
            {companiesData && companiesData.length > 0 ? (
                companiesData.map((company) => {
                    const linkClassName = getPanelLinkClassName(
                        company.id === companyIdParam
                    );

                    return (
                        <Link
                            key={company.id}
                            className={linkClassName}
                            to={company.id}
                        >
                            <Heading size="4">{company.name}</Heading>
                        </Link>
                    );
                })
            ) : (
                <div className="p-8">
                    No companies yet.{' '}
                    <Link to="create" className="text-cyan-500">
                        Create one.
                    </Link>
                </div>
            )}
        </AppLayout>
    );
}
