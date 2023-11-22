import { Button } from './Button';
import { BookIcon, BookOpen } from 'lucide-react';

interface ReadMoreButtonProps {
    more: boolean;
    onClick: () => void;
    size?: 'default' | 'tiny';
}

export default function ReadMoreButton({
    more,
    size,
    ...rest
}: ReadMoreButtonProps) {
    return (
        <Button
            className="flex gap-2 items-center"
            variant="default"
            size={size}
            {...rest}
        >
            {more ? (
                <BookIcon className="w-4 h-4" />
            ) : (
                <BookOpen className="w-4 h-4" />
            )}
            {more ? 'Collapse' : 'Read more'}
        </Button>
    );
}
