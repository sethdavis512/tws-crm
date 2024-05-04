import { type ReactNode } from 'react';
import { cn } from '~/utils/css';
import { Heading } from './Heading';
interface ModalProps {
    children: ReactNode;
    heading: string;
    isOpen: boolean;
    closeModal: () => void;
    footer?: ReactNode;
}

export function Modal({
    children,
    footer,
    heading,
    isOpen,
    closeModal
}: ModalProps) {
    const modalClassName = cn(
        'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full',
        !isOpen && 'hidden'
    );

    return (
        <div
            id="default-modal"
            tab-index="-1"
            aria-hidden="true"
            className={modalClassName}
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-zinc-800">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-zinc-600">
                        <Heading>{heading}</Heading>
                        <button
                            type="button"
                            className="text-zinc-400 bg-transparent hover:bg-zinc-200 hover:text-zinc-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-zinc-600 dark:hover:text-white"
                            data-modal-hide="default-modal"
                            onClick={closeModal}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">{children}</div>
                    <div className="flex items-center p-4 md:p-5 border-t border-zinc-200 rounded-b dark:border-zinc-600">
                        {footer}
                    </div>
                </div>
            </div>
        </div>
    );
}
