import type { ReactNode } from 'react';
import { cx } from 'cva.config';

import { BORDER_COLORS } from '~/constants';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className }: CardProps) {
    const cardClassName = cx(`${BORDER_COLORS} rounded-lg p-4`, className);

    return <div className={cardClassName}>{children}</div>;
}
