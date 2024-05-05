import { type ReactNode } from 'react';
import { StickyHeader } from './StickyHeader';
import { cn } from '~/utils/css';

interface ScrollyPanelProps {
    children: ReactNode;
    heading: string;
    aux?: ReactNode;
    className?: string;
    padded?: boolean;
}

export function ScrollyPanel({
    aux = null,
    className,
    children,
    heading,
    padded
}: ScrollyPanelProps) {
    return (
        <section>
            <StickyHeader text={heading}>
                {/* I hate this but it works 🤷🏻‍♂️ */}
                {aux ?? <div className="h-9"> </div>}
            </StickyHeader>
            <div className={cn({ 'p-4': padded }, className)}>{children}</div>
        </section>
    );
}
