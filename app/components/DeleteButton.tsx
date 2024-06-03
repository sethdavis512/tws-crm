import { Button } from '@lemonsqueezy/wedges';
import { Trash } from 'lucide-react';

export function DeleteButton() {
    return (
        <Button variant="primary" color="red" name="intent" value="delete">
            <Trash className="w-5 h-5" />
            <span className="sr-only">Delete</span>
        </Button>
    );
}
