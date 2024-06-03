import { type ReactElement, type ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cx } from 'cva.config';

import { useToggle } from '~/hooks/useToggle';
import { Button } from '@lemonsqueezy/wedges';

interface FoldableListProps {
    children: ReactNode;
    icon: ReactElement;
    text: string;
}

export function FoldableList({ children, icon, text }: FoldableListProps) {
    const [isOpen, toggleIsOpen] = useToggle();

    return (
        <>
            <Button
                before={icon}
                type="button"
                className="flex items-center justify-start w-full mb-2"
                onClick={toggleIsOpen}
                variant="transparent"
                after={
                    isOpen ? (
                        <ChevronDown className="w-5 h-5 justify-self-end" />
                    ) : (
                        <ChevronRight className="w-5 h-5 justify-self-end" />
                    )
                }
            >
                {text}
            </Button>
            <ul className={cx('space-y-2 pl-6', !isOpen && 'hidden')}>
                {children}
            </ul>
        </>
    );
}
