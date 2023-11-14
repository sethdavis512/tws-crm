import { type ReactNode } from 'react';

interface MainProps {
    children: ReactNode;
}

const Main = ({ children }: MainProps) => {
    return <main className="col-span-10">{children}</main>;
};

export { Main };
