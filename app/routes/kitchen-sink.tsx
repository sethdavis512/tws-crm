import { type ReactNode, useEffect, useReducer, useRef, useState } from 'react';
import {
    draggable,
    dropTargetForElements,
    monitorForElements
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';
import { GripVerticalIcon } from 'lucide-react';
import { Button } from '@lemonsqueezy/wedges';

import { Drawer } from '~/components/Drawer';
import { Heading } from '~/components/Heading';
import { Modal } from '~/components/Modal';
import { cx } from 'cva.config';
import Flex from '~/components/Flex';

const Box = ({
    children,
    id,
    className
}: {
    children: ReactNode;
    id: string;
    className: string;
}) => {
    const boxRef = useRef<HTMLDivElement | null>(null);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        const el = boxRef.current;
        invariant(el);

        return draggable({
            element: el,
            onDragStart: () => setDragging(true),
            onDrop: () => setDragging(false),
            getInitialData: () => ({}) // props go here
        });
    }, []);

    return (
        <div
            id={id}
            className={cx(
                className,
                'hover:bg-zinc-800',
                dragging && 'opacity-40'
            )}
            ref={boxRef}
        >
            {children}
        </div>
    );
};

const BoxDrop = ({ children, id }: { children?: ReactNode; id: string }) => {
    const boxRef = useRef<HTMLDivElement | null>(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);

    useEffect(() => {
        const el = boxRef.current;
        invariant(el);

        return dropTargetForElements({
            element: el,
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: () => setIsDraggedOver(false),
            canDrop: ({ source }) => {
                console.log(source);
                return true;
            },
            getData: () => ({})
        });
    }, []);

    return (
        <div
            id={id}
            className={cx(
                'w-32 h-16 bg-zinc-500 border',
                isDraggedOver && 'bg-zinc-400'
            )}
            ref={boxRef}
        >
            {children}
        </div>
    );
};

const BoxBoard = ({
    children,
    className
}: {
    children?: ReactNode;
    className: string;
}) => {
    useEffect(() => {
        return monitorForElements({
            onDrop({ source, location }) {}
        });
    }, []);

    return <div className={cx(className)}>{children}</div>;
};

export default function KitchenSink() {
    const [isDrawerOpen, toggleDrawerOpen] = useReducer((s) => !s, false);
    const [isModalOpen, toggleModalOpen] = useReducer((s) => !s, false);

    const [drawerPosition, setDrawerPosition] = useState<
        'left' | 'right' | 'bottom'
    >('left');

    const [drawerSize, setDrawerSize] = useState<'sm' | 'md' | 'lg' | 'full'>(
        'sm'
    );

    return (
        <div className="col-span-12">
            <div className="pt-4 px-4 space-y-4">
                <Heading>Drawer</Heading>
                <p>
                    Drawer set to: {drawerPosition} / {drawerSize}
                </p>
                <Flex>
                    <Button
                        onClick={() => {
                            setDrawerPosition('left');
                            toggleDrawerOpen();
                        }}
                    >
                        Open left
                    </Button>
                    <Button
                        onClick={() => {
                            setDrawerPosition('right');
                            toggleDrawerOpen();
                        }}
                    >
                        Open right
                    </Button>
                    <Button
                        onClick={() => {
                            setDrawerPosition('bottom');
                            toggleDrawerOpen();
                        }}
                    >
                        Open bottom
                    </Button>
                </Flex>
                <Flex>
                    <Button
                        onClick={() => {
                            setDrawerSize('sm');
                            toggleDrawerOpen();
                        }}
                    >
                        Set sm size
                    </Button>
                    <Button
                        onClick={() => {
                            setDrawerSize('md');
                            toggleDrawerOpen();
                        }}
                    >
                        Set medium size
                    </Button>
                    <Button
                        onClick={() => {
                            setDrawerSize('lg');
                            toggleDrawerOpen();
                        }}
                    >
                        Set large size
                    </Button>
                    <Button
                        onClick={() => {
                            setDrawerSize('full');
                            toggleDrawerOpen();
                        }}
                    >
                        Set full size
                    </Button>
                </Flex>
                <Heading>Modal</Heading>
                <Flex>
                    <Button onClick={toggleModalOpen}>Open modal</Button>
                </Flex>
            </div>
            <Drawer
                backdrop
                heading="Marketing tactics 101"
                id="test1234"
                isOpen={isDrawerOpen}
                handleClose={toggleDrawerOpen}
                position={drawerPosition}
                size={drawerSize}
            >
                <p>Sell all the things!</p>
                <p>Sell all the things!</p>
                <p>Sell all the things!</p>
            </Drawer>
            <Modal
                isOpen={isModalOpen}
                heading="Heading"
                handleClose={toggleModalOpen}
                id="myModal"
                footer={
                    <Flex>
                        <Button>Click this</Button>
                    </Flex>
                }
            >
                Test test test
            </Modal>
            <BoxBoard className="space-y-4 p-4">
                <Box
                    id="box-1"
                    className="inline-flex gap-4 px-3 py-2 border border-zinc-500 rounded-xl"
                >
                    <GripVerticalIcon />
                    ABC
                </Box>
                <BoxDrop id="box-drop-1" />
                <Box
                    id="box-2"
                    className="inline-flex gap-4 px-3 py-2 border border-zinc-500 rounded-xl"
                >
                    <GripVerticalIcon />
                    DEF
                </Box>
                <BoxDrop id="box-drop-2" />
            </BoxBoard>
        </div>
    );
}
