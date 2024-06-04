import { cx } from 'cva.config';
import React, { Children, type ReactNode } from 'react';

interface ListProps {
    children: ReactNode;
    className?: string;
    listItemClassName?: string;
}

export default function List({
    children,
    className,
    listItemClassName,
}: ListProps) {
    return (
        <ul className={cx('space-y-2', className)}>
            {Children.map(children, (child) => {
                return <li className={listItemClassName}>{child}</li>;
            })}
        </ul>
    );
}
