import { useReducer, useState } from 'react';
import { Button } from '~/components/Button';
import { Drawer } from '~/components/Drawer';
import ParentLayout from '~/components/ParentLayout';

export default function KitchenSink() {
    const [isDrawerOpen, toggleDrawerOpen] = useReducer((s) => !s, false);

    const [drawerPosition, setDrawerPosition] = useState<
        'left' | 'right' | 'bottom'
    >('left');

    console.log(isDrawerOpen, drawerPosition);

    return (
        <div className="col-span-12">
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
            <Drawer
                heading="test"
                id="test1234"
                isOpen={isDrawerOpen}
                onClose={toggleDrawerOpen}
                position={drawerPosition}
                backdrop
            >
                Test
            </Drawer>
        </div>
    );
}
