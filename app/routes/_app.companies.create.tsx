import { Outlet } from '@remix-run/react';
import { Heading } from '~/components/Heading';
import ScrollColumn from '~/components/ScrollColumn';
import { BORDER_LEFT_COLORS } from '~/constants';

export default function CreateCompanyRoute() {
    return (
        <ScrollColumn
            header={<Heading>Create a company</Heading>}
            className={`sm:col-span-8 ${BORDER_LEFT_COLORS}`}
        >
            <Outlet />
        </ScrollColumn>
    );
}
