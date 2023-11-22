import type { User } from '@prisma/client';
import type { ReactNode } from 'react';

import type { Theme } from '~/utils/theme-provider';
import Navbar from './Navbar';
import Grid from './Grid';

interface SiteLayoutProps {
    children: ReactNode;
    theme: Theme;
    user: User;
}

export default function SiteLayout({ children, theme, user }: SiteLayoutProps) {
    return (
        <Grid className="grid-rows-[auto_1fr] h-screen w-screen">
            <Navbar theme={theme} user={user} />
            {children}
        </Grid>
    );
}
