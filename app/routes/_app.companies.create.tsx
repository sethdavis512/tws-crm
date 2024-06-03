import { Outlet } from '@remix-run/react';
import { Heading } from '~/components/Heading';

export default function CreateCompanyRoute() {
    return (
        <div className="p-4">
            <Heading className="mb-4">Create a company</Heading>
            <Outlet />
        </div>
    );
}
