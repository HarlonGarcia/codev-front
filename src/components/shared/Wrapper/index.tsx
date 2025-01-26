import { PropsWithChildren } from 'react'

import { twMerge } from 'tailwind-merge';

interface WrapperProps {
    className?: string;
}

export const Wrapper = ({
    children,
    className,
}: PropsWithChildren<WrapperProps>) => {
    const classes = twMerge('px-4 pb-4 pt-20 xs:px-8 xs:pb-8 sm:px-14 sm:pb-14 lg:px-20 lg:pb-20 lg:pt-28 3xl:max-w-[100rem] 3xl:mx-auto',
        className,
    )
    return (
        <div className={classes}>
            {children}
        </div>
    )
}