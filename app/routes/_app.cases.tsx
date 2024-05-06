import { json } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';

import { Heading } from '~/components/Heading';
import { NewButtonLink } from '~/components/NewButtonLink';
import ParentLayout from '~/components/ParentLayout';
import { getAllCases } from '~/models/case.server';
import { PRIMARY_COLOR } from '~/utils/constants';
import { getPanelLinkClassName } from '~/utils/css';
import { truncateString } from '~/utils/functions';

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
                            <Heading
                                size="4"
                                as="h3"
                                className="dark:text-white"
                            >
                                {caseObj.title}
                            </Heading>
                            <p className="font-normal text-zinc-700 dark:text-white break-words">
                                {truncateString(caseObj.description, 5, false)}
                            </p>
                        </Link>
                    );
                })
            ) : (
                <div className="p-8">
                    No interactions yet.{' '}
                    <Link to="create" className={PRIMARY_COLOR}>
                        Create one.
                    </Link>
                </div>
            )}
        </ParentLayout>
    );
}
