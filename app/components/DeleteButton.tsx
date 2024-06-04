import { Button } from '@lemonsqueezy/wedges';
import { Trash } from 'lucide-react';

export function DeleteButton() {
    return (
        <Button variant="primary" color="red" name="intent" value="delete">
            <Trash className="h-5 w-5" />
            <span className="sr-only">Delete</span>
        </Button>
    );
}
