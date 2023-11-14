import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import PageGrid from '~/components/PageGrid';

import { getAllInteractions } from '~/models/interaction.server';

export async function loader({ request }: LoaderFunctionArgs) {
    const interactions = await getAllInteractions();

    return json({
        interactions
    });
}

export default function InteractionsRoute() {
    const { interactions } = useLoaderData<typeof loader>();

    return (
        <PageGrid>
            {interactions && interactions.length > 0 ? (
                interactions.map((interaction) => (
                    <Link
                        to={interaction.id}
                        key={interaction.id}
                        className="block p-4 bg-white border-b border-b-gray-200 dark:bg-gray-800 dark:border-b-gray-700"
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
                ))
            ) : (
                <div className="p-8">
                    No interactions yet.{' '}
                    <Link to="create" className="text-cyan-500">
                        Create one.
                    </Link>
                </div>
            )}
        </PageGrid>
    );
}
