import { json } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';

import { Badge } from '~/components/Badge';
import { Card } from '~/components/Card';
import { Heading } from '~/components/Heading';
import { LinkButton } from '~/components/LinkButton';
import { NewButtonLink } from '~/components/NewButtonLink';
import { ScrollyColumn } from '~/components/ScrollyColumn';
import { ScrollyPanel } from '~/components/ScrollyPanel';
import { Stack } from '~/components/Stack';
import { getAllInteractions } from '~/models/interaction.server';
import { formatTheDate } from '~/utils';
import { PRIMARY_COLOR } from '~/utils/constants';
import { truncateString } from '~/utils/functions';

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
                heading={
                    <>
                        Interactions{' '}
                        <span className="text-zinc-300 dark:text-zinc-500">
                            ({interactions.length})
                        </span>
                    </>
                }
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
                                <Stack className="items-center">
                                    <Link to={interaction.id}>
                                        <Heading as="h3">
                                            {interaction.title}
                                        </Heading>
                                    </Link>
                                    <LinkButton
                                        to={`/cases/${interaction.caseId}`}
                                        size="sm"
                                    >
                                        View {interaction?.Case?.title}
                                    </LinkButton>
                                    <Stack>
                                        <span className="block">Updated:</span>
                                        <Badge>
                                            {formatTheDate(
                                                interaction?.updatedAt as string
                                            )}
                                        </Badge>
                                    </Stack>
                                    <p
                                        className={`dark:text-zinc-400 font-normal text-zinc-700 ${
                                            isSelected &&
                                            'text-white dark:text-zinc-200'
                                        } break-words`}
                                    >
                                        {truncateString(
                                            interaction.description,
                                            10,
                                            true
                                        )}
                                    </p>
                                </Stack>
                            </Card>
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
            </ScrollyPanel>
        </ScrollyColumn>
    );
}
