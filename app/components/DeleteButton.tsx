import { Button } from './Button';
import { Trash } from 'lucide-react';

export function DeleteButton() {
    return (
        <Button
            className="flex gap-2 items-center"
            variant="danger"
            name="intent"
            value="delete"
        >
            <Trash className="w-5 h-5" />
            {/* <span>Delete</span> */}
        </Button>
    );
}
