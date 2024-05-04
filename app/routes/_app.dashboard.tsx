import { InteractionType } from '@prisma/client';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ChevronRight } from 'lucide-react';
import { Badge } from '~/components/Badge';
import { Card } from '~/components/Card';
import { Grid } from '~/components/Grid';
import { Heading } from '~/components/Heading';
import { LinkButton } from '~/components/LinkButton';
import { Separator } from '~/components/Separator';
import { Stack } from '~/components/Stack';
import { getLatestCases } from '~/models/case.server';
import { getLatestInteractions } from '~/models/interaction.server';
import { formatTheDate } from '~/utils';
import { BORDER_BOTTOM_COLORS, Urls } from '~/utils/constants';

export async function loader({ request }: LoaderFunctionArgs) {
    const latestCases = await getLatestCases();
    const latestInteractions = await getLatestInteractions();

    return json({
        latestCases,
        latestInteractions
    });
}

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
    type
}: DashboardCardProps) {
    return (
        <Card className="col-span-6">
            <Heading>{heading} (5)</Heading>
            <Separator className="mt-4" />
            <ul>
                {data.map((listObj, idx) => (
                    <li
                        key={listObj.id}
                        className={`${
                            data.length - 1 !== idx ? BORDER_BOTTOM_COLORS : ''
                        } mb-4`}
                    >
                        <Stack className="mb-4 items-center">
                            <Heading size="4" className="leading-none">
                                {listObj.title}
                            </Heading>
                            {listObj.type && <Badge>{listObj.type}</Badge>}
                            <p className="text-gray-400">
                                Created: {formatTheDate(listObj.createdAt)}
                            </p>
                        </Stack>
                        <LinkButton
                            className="inline-flex items-center mb-4"
                            to={`${baseUrl}/${listObj.id}`}
                            size="sm"
                        >
                            {`View ${cardType}`} <ChevronRight />
                        </LinkButton>
                    </li>
                ))}
            </ul>
        </Card>
    );
}

export default function DashboardRoute() {
    const { latestCases, latestInteractions } = useLoaderData<typeof loader>();

    return (
        <div className="p-8 col-span-10">
            <Heading as="h1" size="1" className="mb-4">
                Dashboard
            </Heading>
            <Grid className="gap-4">
                <DashboardCard
                    baseUrl={Urls.CASES}
                    cardType="case"
                    heading="Latest cases"
                    data={latestCases}
                />
                <DashboardCard
                    baseUrl={Urls.INTERACTIONS}
                    cardType="interaction"
                    heading="Latest interactions"
                    data={latestInteractions}
                />
            </Grid>
        </div>
    );
}
