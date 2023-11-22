import type { ReactNode } from 'react';
import { BORDER_COLORS } from '~/utils/constants';
import { cn } from '~/utils/css';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className }: CardProps) {
    const cardClassName = cn(`${BORDER_COLORS} rounded-lg p-4`, className);

    return <div className={cardClassName}>{children}</div>;
}
