import { json } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';

import { Heading } from '~/components/Heading';
import { NewButtonLink } from '~/components/NewButtonLink';
import ParentLayout from '~/components/ParentLayout';
import { getAllCases } from '~/models/case.server';
import { getPanelLinkClassName } from '~/utils/css';

export async function loader() {
    const cases = await getAllCases();

    return json({
        cases
    });
}

export default function CasesRoute() {
    const { id: caseIdParam } = useParams();
    const { cases } = useLoaderData<typeof loader>();

    return (
        <ParentLayout heading="Cases" aux={<NewButtonLink to="create" />}>
            {cases && cases.length > 0 ? (
                cases.map((caseObj) => {
                    const linkClassName = getPanelLinkClassName(
                        caseObj.id === caseIdParam
                    );
                    return (
                        <Link
                            to={caseObj.id}
                            key={caseObj.id}
                            className={linkClassName}
                        >
                            <Heading size="4">{caseObj.title}</Heading>
                            <p className="font-normal text-zinc-700 dark:text-zinc-400 break-words">
                                {`${caseObj.description
                                    .split(' ')
                                    .slice(0, 5)
                                    .join(' ')}...`}
                            </p>
                        </Link>
                    );
                })
            ) : (
                <div className="p-8">
                    No interactions yet.{' '}
                    <Link to="create" className="text-cyan-500">
                        Create one.
                    </Link>
                </div>
            )}
        </ParentLayout>
    );
}
