import { Pencil } from 'lucide-react';

import { LinkButton } from './LinkButton';

interface EditButtonProps {
    to: string;
}

export function EditButton({ to }: EditButtonProps) {
    return (
        <LinkButton
            to={to}
            className="flex gap-2"
            name="intent"
            value="edit"
            variant="warning"
        >
            <Pencil className="w-5 h-5" />
            <span>Edit</span>
        </LinkButton>
    );
}
