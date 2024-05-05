import { json } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';

import { Badge } from '~/components/Badge';
import { Card } from '~/components/Card';
import { Heading } from '~/components/Heading';
import { NewButtonLink } from '~/components/NewButtonLink';
import { ScrollyColumn } from '~/components/ScrollyColumn';
import { ScrollyPanel } from '~/components/ScrollyPanel';
import { Stack } from '~/components/Stack';
import { getAllInteractions } from '~/models/interaction.server';
import { formatTheDate } from '~/utils';

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
        <ScrollyColumn>
            <ScrollyPanel
                aux={<NewButtonLink to="create" />}
                heading="Interactions"
                padded
                className="space-y-4"
            >
                {interactions && interactions.length > 0 ? (
                    interactions.map((interaction) => {
                        const isSelected =
                            interaction.id === interactionIdParam;

                        return (
                            <Card
                                key={interaction.id}
                                className="col-span-full"
                            >
                                <Stack className="mb-4">
                                    <Stack className="items-start" vertical>
                                        <Link to={interaction.id}>
                                            <Heading as="h3">
                                                Interaction: {interaction.title}
                                            </Heading>
                                        </Link>
                                        <Link
                                            to={`/cases/${interaction.caseId}`}
                                        >
                                            <Heading as="h4" size="5">
                                                Case: {interaction?.Case?.title}
                                            </Heading>
                                        </Link>
                                        <Stack>
                                            <span className="block">
                                                Updated:
                                            </span>
                                            <Badge>
                                                {formatTheDate(
                                                    interaction?.updatedAt as string
                                                )}
                                            </Badge>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <p
                                    className={`dark:text-zinc-400 font-normal text-zinc-700 ${
                                        isSelected &&
                                        'text-white dark:text-zinc-200'
                                    } break-words`}
                                >
                                    {`${interaction.description
                                        .split(' ')
                                        .slice(0, 25)
                                        .join(' ')}...`}
                                </p>
                            </Card>
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
            </ScrollyPanel>
        </ScrollyColumn>
    );
}
