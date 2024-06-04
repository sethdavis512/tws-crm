import { type ReactNode } from 'react';
import { cx } from 'cva.config';

import { BACKGROUND_COLORS, BORDER_BOTTOM_COLORS } from '~/constants';

interface ScrollColumnProps {
    children: ReactNode;
    header?: ReactNode;
    className?: string;
}

export default function ScrollColumn({
    children,
    className,
    header,
}: ScrollColumnProps) {
    return (
        <div className={cx(`col-span-full overflow-y-auto`, className)}>
            {header && (
                <header
                    className={`sticky left-0 top-0 p-4 ${BACKGROUND_COLORS} ${BORDER_BOTTOM_COLORS}`}
                >
                    {header}
                </header>
            )}
            <div className="p-4">{children}</div>
        </div>
    );
}
