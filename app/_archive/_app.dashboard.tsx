import type { InteractionType } from '@prisma/client';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ChevronRight } from 'lucide-react';
import { Badge } from '~/components/Badge';
import { Card } from '~/components/Card';
import { Heading } from '~/components/Heading';
import { LinkButton } from '~/components/LinkButton';
import { ScrollyColumn } from '~/components/ScrollyColumn';
import { ScrollyPanel } from '~/components/ScrollyPanel';
import { Separator } from '~/components/Separator';
import { Stack } from '~/components/Stack';
import { getLatestCases } from '~/models/case.server';
import { getLatestInteractions } from '~/models/interaction.server';
import { formatTheDate } from '~/utils';
import { Urls } from '~/utils/constants';

interface DashboardCardProps {
    baseUrl: string;
    data: any[];
    cardType: string;
    heading: string;
    type?: InteractionType;
}

export function DashboardCard({
    baseUrl,
    data,
    cardType,
    heading,
    type,
}: DashboardCardProps) {
    return (
        <Card className="col-span-6">
            <Heading>
                {heading} ({data.length})
            </Heading>
            <Separator className="mt-4" />
            <ul className="space-y-4">
                {data.map((listObj, idx) => (
                    <li key={listObj.id}>
                        <Stack className="items-center">
                            <LinkButton
                                to={`${baseUrl}/${listObj.id}`}
                                size="sm"
                            >
                                <ChevronRight />
                            </LinkButton>
                            <Heading as="h3" size="5">
                                {listObj.title}
                            </Heading>
                            {listObj.type && (
                                <Badge variant="secondary">
                                    {listObj.type}
                                </Badge>
                            )}
                            <p className="text-zinc-400">
                                Created: {formatTheDate(listObj.createdAt)}
                            </p>
                        </Stack>
                    </li>
                ))}
            </ul>
        </Card>
    );
}

export async function loader() {
    const latestCases = await getLatestCases();
    const latestInteractions = await getLatestInteractions();

    return json({
        latestCases,
        latestInteractions,
    });
}

export default function DashboardRoute() {
    const { latestCases, latestInteractions } = useLoaderData<typeof loader>();

    return (
        <ScrollyColumn>
            <ScrollyPanel heading="Dashboard" padded>
                <Stack className="w-full gap-4">
                    <div className="basis-1/2">
                        <DashboardCard
                            baseUrl={Urls.CASES}
                            cardType="case"
                            heading="Latest cases"
                            data={latestCases}
                        />
                    </div>
                    <div className="basis-1/2">
                        <DashboardCard
                            baseUrl={Urls.INTERACTIONS}
                            cardType="interaction"
                            heading="Latest interactions"
                            data={latestInteractions}
                        />
                    </div>
                </Stack>
            </ScrollyPanel>
        </ScrollyColumn>
    );
}
