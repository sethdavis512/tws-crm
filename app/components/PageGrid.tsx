import { type ReactNode } from 'react';
import { Link, Outlet } from '@remix-run/react';
import { Plus } from 'lucide-react';
import Footer from './Footer';

interface PageGridProps {
    children: ReactNode;
}

export default function PageGrid({ children }: PageGridProps) {
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-3 h-[calc(100vh_-_60px)] overflow-y-auto relative border-r border-r-gray-200 dark:border-r-gray-700">
                <Link
                    to="create"
                    className="flex gap-2 p-4 bg-white dark:bg-gray-800 sticky top-0 left-0 right-0 border-b border-b-gray-200 dark:border-b-gray-700"
                >
                    <Plus /> Create new
                </Link>
                {children}
            </div>
            <div className="col-span-9 h-[calc(100vh_-_60px)] overflow-y-auto flex flex-col justify-between">
                <Outlet />
                <Footer />
            </div>
        </div>
    );
}
