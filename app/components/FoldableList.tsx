import { type ReactElement, type ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cx } from 'cva.config';

import { useToggle } from '~/hooks/useToggle';
import {
    BACKGROUND_HOVER_ACTIVE_COLORS,
    BACKGROUND_HOVER_COLORS,
} from '~/constants';
import Flex from './Flex';
import { useLocation } from '@remix-run/react';
import List from './List';

interface FoldableListProps {
    children: ReactNode;
    icon: ReactElement;
    text: string;
    className?: string;
}

export function FoldableList({
    children,
    className,
    icon,
    text,
}: FoldableListProps) {
    const location = useLocation();
    const pathnameContainsText = location.pathname
        .toLowerCase()
        .includes(text.toLowerCase());

    const [isOpen, toggleIsOpen] = useToggle(pathnameContainsText);

    const isDetails =
        location.pathname.split('/').length > 2 &&
        !['create'].every((path) => location.pathname.includes(path));

    return (
        <>
            <Flex
                className={cx(
                    'mb-2 justify-between rounded-lg p-2',
                    BACKGROUND_HOVER_COLORS,
                    pathnameContainsText &&
                        isDetails &&
                        BACKGROUND_HOVER_ACTIVE_COLORS,
                    className
                )}
                onClick={toggleIsOpen}
            >
                <Flex>
                    {icon}
                    {text}
                </Flex>
                {isOpen ? (
                    <ChevronDown className="h-5 w-5 justify-self-end" />
                ) : (
                    <ChevronRight className="h-5 w-5 justify-self-end" />
                )}
            </Flex>
            <List className={cx('pl-6', !isOpen && 'hidden')}>{children}</List>
        </>
    );
}
