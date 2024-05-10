import { type ReactNode } from 'react';
import { X } from 'lucide-react';

import { cn } from '~/utils/css';
import { Button } from './Button';
import {
    BACKGROUND_COLORS,
    BORDER_BOTTOM_COLORS,
    BORDER_COLORS,
    BORDER_TOP_COLORS
} from '~/utils/constants';
import { Heading } from './Heading';

interface ModalProps {
    children: ReactNode;
    heading: string;
    id: string;
    isOpen: boolean;
    handleClose: () => void;
    footer?: ReactNode;
}

export function Modal({
    children,
    footer,
    handleClose,
    heading,
    id,
    isOpen = false
}: ModalProps) {
    const modalClassName = cn(
        `flex items-center justify-center fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-zinc-800/70`,
        !isOpen && 'hidden'
    );

    return (
        <div data-id={id} className={modalClassName} tabIndex={-1}>
            <div className={`relative w-full max-w-lg max-h-full`}>
                <div
                    className={`relative rounded-lg shadow ${BACKGROUND_COLORS} ${BORDER_COLORS} rounded-xl`}
                >
                    <div
                        className={`flex items-center justify-between p-4 md:p-5 rounded-t ${BORDER_BOTTOM_COLORS}`}
                    >
                        <Heading>{heading}</Heading>
                        <Button type="button" onClick={handleClose}>
                            <X />
                            <span className="sr-only">Close modal</span>
                        </Button>
                    </div>
                    <div className="p-4">{children}</div>
                    <footer
                        className={`flex items-center p-4 ${BORDER_TOP_COLORS} rounded-b`}
                    >
                        {footer}
                    </footer>
                </div>
            </div>
        </div>
    );
}
