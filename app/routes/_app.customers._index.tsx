import { Heading } from '~/components/Heading';
import ScrollColumn from '~/components/ScrollColumn';
import { BORDER_COLORS, BORDER_LEFT_COLORS } from '~/constants';

export default function CompaniesIndexRoute() {
    return (
        <ScrollColumn
            header={<Heading>Details</Heading>}
            className={`sm:col-span-8 ${BORDER_LEFT_COLORS}`}
        >
            <div className={`rounded-xl border p-4 ${BORDER_COLORS}`}>
                <p className="text-2xl text-zinc-500">
                    Select a company from the list...
                </p>
            </div>
        </ScrollColumn>
    );
}
