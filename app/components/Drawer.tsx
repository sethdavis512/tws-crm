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
    heading: string;
    id: string;
    isOpen: boolean;
    position?: 'left' | 'right' | 'bottom';
    onClose: () => void;
}

export function Drawer({
    children,
    heading,
    id,
    isOpen = false,
    position = 'left',
    onClose
}: DrawerProps) {
    const drawerClassName = cn(
        `w-96 fixed z-50 p-8 overflow-y-auto transition-translate ${BACKGROUND_COLORS} ${BORDER_LEFT_COLORS}`,
        {
            [`top-0 right-0 h-screen ${BORDER_LEFT_COLORS}`]:
                position === 'right',
            '': position === 'right' && !isOpen,
            'translate-x-full': position === 'right' && isOpen
        },
        {
            [`top-0 left-0 h-screen ${BORDER_RIGHT_COLORS}`]:
                position === 'left',
            '': position === 'left' && !isOpen,
            '-translate-x-full': position === 'left' && isOpen
        },
        {
            [`w-full bottom-0 ${BORDER_TOP_COLORS}`]: position === 'bottom',
            '': position === 'bottom' && !isOpen,
            'translate-y-full': position === 'bottom' && isOpen
        }
    );

    return (
        <div
            id={id}
            className={drawerClassName}
            tabIndex={-1}
            aria-labelledby={`${id}-label`}
        >
            <Stack className="justify-between">
                <Heading id={`${id}-label`}>{heading}</Heading>
                <Button onClick={onClose}>
                    {position === 'bottom' ? (
                        <PanelBottomCloseIcon />
                    ) : position === 'left' ? (
                        <PanelLeftCloseIcon />
                    ) : position === 'right' ? (
                        <PanelRightCloseIcon />
                    ) : null}
                </Button>
            </Stack>
            {children}
        </div>
    );
}
