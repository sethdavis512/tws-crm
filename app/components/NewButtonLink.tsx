import { PlusIcon } from 'lucide-react';
import { LinkButton } from './LinkButton';
import { Stack } from './Stack';

interface NewButtonLinkProps {
    to: string;
}

export function NewButtonLink({ to }: NewButtonLinkProps) {
    return (
        <LinkButton to={to} variant="success">
            <Stack className="items-center">
                <PlusIcon className="w-5 h-5" />
                <p className="self-center">New</p>
            </Stack>
        </LinkButton>
    );
}
