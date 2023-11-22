import { Link } from '@remix-run/react';
import { PlusIcon } from 'lucide-react';

interface NewButtonLinkProps {
    to: string;
}

export default function NewButtonLink({ to }: NewButtonLinkProps) {
    return (
        <Link
            to={to}
            className="p-2 rounded-md bg-green-200 dark:bg-green-700 text-zinc-800 dark:text-zinc-200 flex gap-2 hover:bg-green-300 hover:dark:bg-green-800"
        >
            <PlusIcon /> New
        </Link>
    );
}
