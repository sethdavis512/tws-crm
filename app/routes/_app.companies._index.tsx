import { BORDER_COLORS } from '~/constants';

export default function CompaniesIndexRoute() {
    return (
        <div className={`border rounded-xl p-4 ${BORDER_COLORS}`}>
            <p className="text-2xl text-zinc-500">
                Select a company from the list...
            </p>
        </div>
    );
}
