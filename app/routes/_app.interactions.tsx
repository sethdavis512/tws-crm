import { json } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';

import { Badge } from '~/components/Badge';
import { Card } from '~/components/Card';
import { Grid } from '~/components/Grid';
import { Heading } from '~/components/Heading';
import { NewButtonLink } from '~/components/NewButtonLink';
import { Stack } from '~/components/Stack';
import { StickyHeader } from '~/components/StickyHeader';
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
        <div className={`col-span-10 overflow-y-auto`}>
            <StickyHeader text="Interactions">
                <NewButtonLink to="create" />
            </StickyHeader>
            <Grid>
                {interactions && interactions.length > 0 ? (
                    interactions.map((interaction) => {
                        const isSelected =
                            interaction.id === interactionIdParam;

                        return (
                            <Card
                                key={interaction.id}
                                className="col-span-4 m-4"
                            >
                                <Stack vertical className="items-start">
                                    <Link to={interaction.id}>
                                        <Heading size="5">
                                            {interaction.title}
                                        </Heading>
                                    </Link>
                                    <Stack vertical>
                                        {interaction?.Case && (
                                            <Stack>
                                                <span className="block">
                                                    Case:
                                                </span>
                                                <Badge>
                                                    {interaction?.Case?.title}
                                                </Badge>
                                            </Stack>
                                        )}
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
                                    <p
                                        className={`dark:text-zinc-400 font-normal text-zinc-700 ${
                                            isSelected &&
                                            'text-white dark:text-zinc-200'
                                        } break-words`}
                                    >
                                        {`${interaction.description
                                            .split(' ')
                                            .slice(0, 5)
                                            .join(' ')}...`}
                                    </p>
                                </Stack>
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
            </Grid>
        </div>
    );
}
