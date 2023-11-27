import { type ReactNode } from 'react';
import { BORDER_RIGHT_COLORS } from '~/utils/constants';

interface AppListProps {
    children: ReactNode;
}

export function AppList({ children }: AppListProps) {
    return (
        <div className={`col-span-3 ${BORDER_RIGHT_COLORS} overflow-y-auto`}>
            {children}
        </div>
    );
}
