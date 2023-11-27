import { formatTheDate } from '~/utils';
import { Card } from './Card';
import { ReadMoreButton } from './ReadMoreButton';
import { Heading } from './Heading';

interface InteractionCardProps {
    createdAt: string;
    description: string;
    heading: string;
    toggle: () => void;
    more: boolean;
}

export function InteractionCard({
    createdAt,
    description,
    heading,
    toggle,
    more
}: InteractionCardProps) {
    return (
        <Card>
            <div className="flex justify-between">
                <Heading>{heading}</Heading>
                <span className="text-gray-200 dark:text-gray-400">
                    {formatTheDate(createdAt)}
                </span>
            </div>
            <p className="mb-4">
                {more
                    ? description
                    : `${description.split(' ').slice(0, 5).join(' ')}...`}
            </p>
            <ReadMoreButton onClick={toggle} show={more} />
        </Card>
    );
}
