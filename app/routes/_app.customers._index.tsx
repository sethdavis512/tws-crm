import { Card } from '~/components/Card';

export default function CustomersIndexRoute() {
    return (
        <div className="p-8">
            <Card>
                <p className="italic">Select a customer to view details.</p>
            </Card>
        </div>
    );
}
