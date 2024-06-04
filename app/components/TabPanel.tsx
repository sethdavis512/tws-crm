import { cva } from 'cva';
import type { RequiredVariantProps } from '~/types';

type TabPanelVariants = RequiredVariantProps<typeof tabPanelVariants>;

type TabPanelProps = Partial<TabPanelVariants> &
    React.HTMLAttributes<HTMLBaseElement>;

const tabPanelVariants = cva('', {
    variants: {
        paddingX: {
            none: '',
            sm: 'px-2',
            md: 'px-4',
            lg: 'px-8',
        },
        paddingY: {
            none: '',
            sm: 'py-2',
            md: 'py-4',
            lg: 'py-8',
        },
    },
    defaultVariants: {
        paddingX: 'none',
        paddingY: 'none',
    },
});

export function TabPanel({ children, paddingY }: TabPanelProps) {
    return <div className={tabPanelVariants({ paddingY })}>{children}</div>;
}
