import { Heading } from '~/components/Heading';
import { BORDER_BOTTOM_COLORS, BORDER_COLORS } from '~/constants';
import { BORDER_LEFT_COLORS } from '~/utils/constants';

export default function CompaniesIndexRoute() {
    return (
        <div
            className={`col-span-full overflow-y-auto sm:col-span-8 ${BORDER_LEFT_COLORS}`}
        >
            <header
                className={`sticky left-0 top-0 wg-bg-wg-white dark:wg-bg-wg-gray-900`}
            >
                <div
                    className={`flex items-center justify-between p-4 ${BORDER_BOTTOM_COLORS}`}
                >
                    <Heading>Details</Heading>
                </div>
            </header>
            <div className="p-4">
                <div className={`rounded-xl border p-4 ${BORDER_COLORS}`}>
                    <p className="text-2xl text-zinc-500">
                        Select a company from the list...
                    </p>
                </div>
            </div>
        </div>
    );
}
