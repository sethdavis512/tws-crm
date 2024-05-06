import type { InteractionType } from '@prisma/client';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ChevronRight } from 'lucide-react';
import { Badge } from '~/components/Badge';
import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Drawer } from '~/components/Drawer';
import { Heading } from '~/components/Heading';
import { LinkButton } from '~/components/LinkButton';
import { ScrollyColumn } from '~/components/ScrollyColumn';
import { ScrollyPanel } from '~/components/ScrollyPanel';
import { Separator } from '~/components/Separator';
import { Stack } from '~/components/Stack';
import { useToggle } from '~/hooks/useToggle';
import { getLatestCases } from '~/models/case.server';
import { getLatestInteractions } from '~/models/interaction.server';
import { formatTheDate } from '~/utils';
import { BORDER_BOTTOM_COLORS, Urls } from '~/utils/constants';

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
                        <Stack className="mb-4 items-start">
                            <Heading size="4" className="leading-none">
                                {listObj.title}
                            </Heading>
                            {listObj.type && <Badge>{listObj.type}</Badge>}
                            <p className="text-zinc-400">
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

export async function loader() {
    const latestCases = await getLatestCases();
    const latestInteractions = await getLatestInteractions();

    return json({
        latestCases,
        latestInteractions
    });
}

export default function DashboardRoute() {
    const { latestCases, latestInteractions } = useLoaderData<typeof loader>();
    const [drawerOpen, toggleDrawer] = useToggle();
    return (
        <>
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
                            <Button onClick={toggleDrawer}>Open</Button>
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
            <Drawer
                id="fromTheBottom"
                heading="From the bottom"
                position="right"
                isOpen={drawerOpen}
                onClose={toggleDrawer}
            >
                Lots and lots of fun!
            </Drawer>
        </>
    );
}
