import { Button } from './Button';
import { BookIcon, BookOpen } from 'lucide-react';

interface ReadMoreButtonProps {
    show: boolean;
    onClick: (e: any) => void;
    value?: string;
}

export function ReadMoreButton({ show, ...rest }: ReadMoreButtonProps) {
    return (
        <Button className="flex gap-2 items-center" {...rest}>
            {show ? (
                <BookIcon className="w-4 h-4" />
            ) : (
                <BookOpen className="w-4 h-4" />
            )}
            {show ? 'Collapse' : 'Read more'}
        </Button>
    );
}
