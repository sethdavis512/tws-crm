import { useEffect } from 'react';
import { useKeyPress } from 'react-use';

interface UseEscapeKeyConfig {
    handler: () => void;
    condition: boolean;
}

export function useEscapeKey({ handler, condition }: UseEscapeKeyConfig) {
    const [escPressed] = useKeyPress('Escape');

    useEffect(() => {
        if (escPressed && condition && handler) {
            handler();
        }
        // eslint-disable-next-line
    }, [escPressed]);

    return;
}
