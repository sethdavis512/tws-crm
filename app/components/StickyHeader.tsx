import { type ReactNode } from 'react';
import { BACKGROUND_COLORS, BORDER_BOTTOM_COLORS } from '~/utils/constants';
import { Heading } from './Heading';

interface StickyHeaderProps {
    text: ReactNode;
    children?: ReactNode;
}

export function StickyHeader({ children, text }: StickyHeaderProps) {
    return (
        <header className={`sticky top-0 left-0 ${BACKGROUND_COLORS}`}>
            <div
                className={`p-4 flex items-center justify-between ${BORDER_BOTTOM_COLORS}`}
            >
                <Heading as="h2">{text}</Heading>
                {children}
            </div>
        </header>
    );
}
