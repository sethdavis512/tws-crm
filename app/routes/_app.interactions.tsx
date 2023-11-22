import { json } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';
import AppLayout from '~/components/AppLayout';
import NewButtonLink from '~/components/NewButtonLink';
import StickyHeader from '~/components/StickyHeader';

import { getAllInteractions } from '~/models/interaction.server';
import { cn } from '~/utils/css';

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
                    const linkClassName = cn(
                        'block p-4 bg-white border-b border-b-gray-200 dark:border-b-gray-700 dark:bg-gray-800',
                        interaction.id === interactionIdParam &&
                            'bg-green-200 dark:bg-green-900'
                    );
                    return (
                        <Link
                            to={interaction.id}
                            key={interaction.id}
                            className={linkClassName}
                        >
                            <h4 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                {interaction.title}
                            </h4>
                            <p className="font-normal text-gray-700 dark:text-gray-400 break-words">
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
