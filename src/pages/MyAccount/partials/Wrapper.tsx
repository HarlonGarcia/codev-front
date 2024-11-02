import { PropsWithChildren } from 'react';

import BackButton from 'components/shared/BackButton'

interface WrapperProps {
    redirectPath: string;
    title: string;
}

export const Wrapper = ({
    redirectPath,
    title,
    children,
}: PropsWithChildren<WrapperProps>) => {
    return (
        <div className='max-w-8xl pt-28 px-20 lg:pt-40 xl:w-xl xl:mx-auto'>
            <div className='flex items-center gap-4 mb-8'>
                <BackButton path={redirectPath} />
                <h2 className='font-fira text-2xl'>{title}</h2>
            </div>
            {children}
        </div>
    )
}
