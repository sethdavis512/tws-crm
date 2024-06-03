import { Children, type ReactElement, type ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cx } from 'cva.config';

import { useToggle } from '~/hooks/useToggle';
import {
    BACKGROUND_HOVER_ACTIVE_COLORS,
    BACKGROUND_HOVER_COLORS
} from '~/constants';
import Flex from './Flex';
import { useLocation } from '@remix-run/react';

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
    text
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
                    'justify-between p-2 rounded-lg mb-2',
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
                    <ChevronDown className="w-5 h-5 justify-self-end" />
                ) : (
                    <ChevronRight className="w-5 h-5 justify-self-end" />
                )}
            </Flex>
            <ul className={cx('space-y-2 pl-6', !isOpen && 'hidden')}>
                {Children.map(children, (child) => {
                    return <li>{child}</li>;
                })}
            </ul>
        </>
    );
}
