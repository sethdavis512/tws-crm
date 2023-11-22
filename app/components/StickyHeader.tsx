import React, { type ReactNode } from 'react';
import { BACKGROUND_COLORS } from '~/utils/constants';

interface StickyHeaderProps {
    children: ReactNode;
    text: string;
}

export default function StickyHeader({ children, text }: StickyHeaderProps) {
    return (
        <div className={`sticky top-0 left-0 ${BACKGROUND_COLORS}`}>
            <div className="p-4 flex items-center justify-between border-b border-b-gray-200 dark:border-b-gray-700">
                <h1 className="text-2xl font-bold pb-0 mb-0">{text}</h1>
                {children}
            </div>
        </div>
    );
}
