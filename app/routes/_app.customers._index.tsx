import { Card } from '~/components/Card';
import { ScrollyColumn } from '~/components/ScrollyColumn';
import { ScrollyPanel } from '~/components/ScrollyPanel';
import { BORDER_LEFT_COLORS } from '~/utils/constants';

export default function CustomersIndexRoute() {
    return (
        <ScrollyColumn size={7} className={BORDER_LEFT_COLORS}>
            <ScrollyPanel heading="Details" padded>
                <Card>
                    <p className="italic">Select a customer to view details.</p>
                </Card>
            </ScrollyPanel>
        </ScrollyColumn>
    );
}
