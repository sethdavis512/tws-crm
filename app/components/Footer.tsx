import { GithubIcon } from 'lucide-react';
import { cn } from '~/utils/css';

interface FooterProps {
    className?: string;
}

export function Footer({ className }: FooterProps) {
    const footerClassName = cn('bg-white dark:bg-zinc-900', className);

    return (
        <footer className={footerClassName}>
            <div className="px-4 py-6 bg-zinc-100 dark:bg-zinc-700 md:flex md:items-center md:justify-between">
                <span className="text-sm text-zinc-500 dark:text-zinc-300 sm:text-center">
                    © 2023 <a href="https://flowbite.com/">Flowbite™</a>. All
                    Rights Reserved.
                </span>
                <div className="flex mt-4 space-x-5 sm:justify-center md:mt-0">
                    <a
                        href="https://github.com/sethdavis512/tws-crm"
                        className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                    >
                        <GithubIcon />
                        <span className="sr-only">GitHub account</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
