import { useReducer } from 'react';

export function useToggle(initialState = false) {
    return useReducer((s) => !s, initialState);
}
