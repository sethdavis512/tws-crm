import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ChevronRight } from 'lucide-react';
import { Card } from '~/components/Card';
import Grid from '~/components/Grid';
import Heading from '~/components/Heading';
import { LinkButton } from '~/components/LinkButton';
import Separator from '~/components/Separator';
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
}

export function DashboardCard({
    baseUrl,
    data,
    cardType,
    heading
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
                        <div className="flex justify-between mb-2">
                            <Heading size="4">{listObj.title}</Heading>
                            <LinkButton
                                size="tiny"
                                className="inline-flex items-center"
                                to={`${baseUrl}/${listObj.id}`}
                            >
                                {`View ${cardType}`} <ChevronRight />
                            </LinkButton>
                        </div>
                        <p className="mb-4 text-gray-500">
                            Created: {formatTheDate(listObj.createdAt)}
                        </p>
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
                    cardType="interactions"
                    heading="Latest interactions"
                    data={latestInteractions}
                />
            </Grid>
        </div>
    );
}
