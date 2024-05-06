import { type ReactNode } from 'react';
import {
    BACKGROUND_COLORS,
    BORDER_LEFT_COLORS,
    BORDER_RIGHT_COLORS,
    BORDER_TOP_COLORS
} from '~/utils/constants';
import { Heading } from './Heading';
import { cn } from '~/utils/css';
import { Button } from './Button';
import {
    PanelBottomCloseIcon,
    PanelLeftCloseIcon,
    PanelRightCloseIcon
} from 'lucide-react';
import { Stack } from './Stack';

interface DrawerProps {
    children: ReactNode;
    id: string;
    backdrop?: boolean;
    heading?: string;
    isOpen?: boolean;
    onClose?: () => void;
    position?: 'left' | 'right' | 'bottom';
    size: 'sm' | 'md' | 'lg' | 'full';
}

export function Drawer({
    children,
    heading,
    id,
    isOpen = false,
    position = 'left',
    onClose,
    backdrop = true,
    size = 'sm'
}: DrawerProps) {
    const drawerClassName = cn(
        `fixed z-50 p-8 overflow-y-auto transition-translate ${BACKGROUND_COLORS} ${BORDER_LEFT_COLORS}`,
        size === 'sm' && 'w-96',
        size === 'md' && 'w-1/2',
        size === 'lg' && 'w-3/4',
        size === 'full' && 'w-[calc(100vw_-_75px)] rounded-lg',
        {
            [`top-0 left-0 h-screen ${BORDER_RIGHT_COLORS} -translate-x-full`]:
                position === 'left',
            'transform-none': position === 'left' && isOpen
        },
        {
            [`top-0 right-0 h-screen ${BORDER_LEFT_COLORS} translate-x-full`]:
                position === 'right',
            'transform-none': position === 'right' && isOpen
        },
        {
            [`w-full bottom-0 ${BORDER_TOP_COLORS} translate-y-full rounded-lg`]:
                position === 'bottom',
            'h-96': position === 'bottom' && size === 'sm',
            'h-1/2': position === 'bottom' && size === 'md',
            'h-3/4': position === 'bottom' && size === 'lg',
            'h-[calc(100vh_-_30px)]': position === 'bottom' && size === 'full',
            'transform-none': position === 'bottom' && isOpen
        }
    );

    const orientedIcon =
        position === 'bottom' ? (
            <PanelBottomCloseIcon />
        ) : position === 'left' ? (
            <PanelLeftCloseIcon />
        ) : position === 'right' ? (
            <PanelRightCloseIcon />
        ) : null;

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                id={id}
                className={drawerClassName}
                tabIndex={-1}
                aria-labelledby={`${id}-label`}
            >
                <Stack className="justify-between mb-4">
                    <Heading id={`${id}-label`}>{heading}</Heading>
                    <Button onClick={onClose}>{orientedIcon}</Button>
                </Stack>
                {children}
            </div>
            {backdrop && (
                <div
                    onClick={onClose}
                    className="bg-zinc-800/70 dark:bg-zinc-800/70 fixed inset-0 z-40"
                />
            )}
        </>
    );
}
