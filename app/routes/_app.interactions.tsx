import { json } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';
import AppLayout from '~/components/AppLayout';
import Heading from '~/components/Heading';
import NewButtonLink from '~/components/NewButtonLink';
import StickyHeader from '~/components/StickyHeader';

import { getAllInteractions } from '~/models/interaction.server';
import { getPanelLinkClassName } from '~/utils/css';

export async function loader() {
    const interactions = await getAllInteractions();

    return json({
        interactions
    });
}

export default function InteractionsRoute() {
    const { id: interactionIdParam } = useParams();
    const { interactions } = useLoaderData<typeof loader>();

    return (
        <AppLayout>
            <StickyHeader text="Interactions">
                <NewButtonLink to="create" />
            </StickyHeader>
            {interactions && interactions.length > 0 ? (
                interactions.map((interaction) => {
                    const isSelected = interaction.id === interactionIdParam;
                    const linkClassName = getPanelLinkClassName(isSelected);

                    return (
                        <Link
                            to={interaction.id}
                            key={interaction.id}
                            className={linkClassName}
                        >
                            <Heading size="4">{interaction.title}</Heading>
                            <p
                                className={`dark:text-gray-400 font-normal text-gray-700 ${
                                    isSelected &&
                                    'text-white dark:text-gray-200'
                                } break-words`}
                            >
                                {`${interaction.description
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
        </AppLayout>
    );
}
