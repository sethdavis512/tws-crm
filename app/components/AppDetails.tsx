import { type ReactNode } from 'react';

interface AppDetailsProps {
    children: ReactNode;
}

export default function AppDetails({ children }: AppDetailsProps) {
    return <div className="col-span-7 overflow-y-auto">{children}</div>;
}
