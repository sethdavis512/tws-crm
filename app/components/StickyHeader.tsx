import { type ReactNode } from 'react';
import { BACKGROUND_COLORS } from '~/utils/constants';
import { Heading } from './Heading';

interface StickyHeaderProps {
    children: ReactNode;
    text: string;
}

export function StickyHeader({ children, text }: StickyHeaderProps) {
    return (
        <div className={`sticky top-0 left-0 ${BACKGROUND_COLORS}`}>
            <div className="p-4 flex items-center justify-between border-b border-b-gray-200 dark:border-b-gray-700">
                <Heading as="h1">{text}</Heading>
                {children}
            </div>
        </div>
    );
}
