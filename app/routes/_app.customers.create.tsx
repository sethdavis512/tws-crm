import { Outlet } from '@remix-run/react';
import Heading from '~/components/Heading';
import ScrollColumn from '~/components/ScrollColumn';
import { BORDER_LEFT_COLORS } from '~/constants';

export default function CreateCustomerRoute() {
    return (
        <ScrollColumn
            header={<Heading size="4">Create a customer</Heading>}
            className={`sm:col-span-8 ${BORDER_LEFT_COLORS}`}
        >
            <Outlet />
        </ScrollColumn>
    );
}
