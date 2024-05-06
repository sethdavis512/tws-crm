import { useReducer, useState } from 'react';
import { Button } from '~/components/Button';
import { Drawer } from '~/components/Drawer';
import { Stack } from '~/components/Stack';

export default function KitchenSink() {
    const [isDrawerOpen, toggleDrawerOpen] = useReducer((s) => !s, false);

    const [drawerPosition, setDrawerPosition] = useState<
        'left' | 'right' | 'bottom'
    >('left');

    const [drawerSize, setDrawerSize] = useState<'sm' | 'md' | 'lg' | 'full'>(
        'sm'
    );

    return (
        <div className="col-span-12">
            <div className="px-4 space-y-4">
                <p className="py-4">
                    Drawer set to: {drawerPosition} / {drawerSize}
                </p>
                <Stack>
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
                </Stack>
                <Stack>
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
                </Stack>
            </div>
            <Drawer
                backdrop
                heading="Marketing tactics 101"
                id="test1234"
                isOpen={isDrawerOpen}
                onClose={toggleDrawerOpen}
                position={drawerPosition}
                size={drawerSize}
            >
                <p>Sell all the things!</p>
                <p>Sell all the things!</p>
                <p>Sell all the things!</p>
            </Drawer>
        </div>
    );
}
