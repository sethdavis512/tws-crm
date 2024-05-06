import { Card } from '~/components/Card';
import { ScrollyColumn } from '~/components/ScrollyColumn';
import { ScrollyPanel } from '~/components/ScrollyPanel';

export default function CustomersIndexRoute() {
    return (
        <ScrollyColumn size={7}>
            <ScrollyPanel heading="Details" padded>
                <Card>
                    <p className="italic">Select a customer to view details.</p>
                </Card>
            </ScrollyPanel>
        </ScrollyColumn>
    );
}
