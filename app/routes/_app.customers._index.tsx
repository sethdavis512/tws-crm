import { Alert } from '@lemonsqueezy/wedges';
import Heading from '~/components/Heading';
import ScrollColumn from '~/components/ScrollColumn';
import { BORDER_LEFT_COLORS } from '~/constants';

export default function CustomerIndexRoute() {
    return (
        <ScrollColumn
            header={<Heading size="4">Details</Heading>}
            className={`sm:col-span-8 ${BORDER_LEFT_COLORS}`}
        >
            <Alert color="primary" variant="expanded">
                {`Select a customer from the list...`}
            </Alert>
        </ScrollColumn>
    );
}
