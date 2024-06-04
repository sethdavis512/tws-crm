import { NavLink, type NavLinkProps } from '@remix-run/react';

import { cx } from 'cva.config';
import {
    BACKGROUND_HOVER_ACTIVE_COLORS,
    BACKGROUND_HOVER_COLORS,
} from '~/constants';

export default function AppNavLink({
    children,
    className,
    to,
    ...rest
}: NavLinkProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                cx(
                    'flex gap-1 rounded-lg px-4 py-2',
                    isActive
                        ? BACKGROUND_HOVER_ACTIVE_COLORS
                        : BACKGROUND_HOVER_COLORS,
                    className
                )
            }
            {...rest}
        >
            {children}
        </NavLink>
    );
}
