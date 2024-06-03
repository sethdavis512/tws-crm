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
                <div className="flex mt-4 space-x-5 sm:justify-center md:mt-0">
                    <a
                        href="https://github.com/sethdavis512/tws-crm"
                        className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                    >
                        <GithubIcon className="w-5 h-5" />
                        <span className="sr-only">GitHub account</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
