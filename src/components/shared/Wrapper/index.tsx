import { PropsWithChildren } from 'react'

export const Wrapper = ({ children }: PropsWithChildren) => {
    return (
        <div
            className={`px-4 pb-4 pt-20 xs:px-8 xs:pb-8 sm:px-14 sm:pb-14 lg:px-20 lg:pb-20 lg:pt-28 3xl:max-w-[100rem] 3xl:mx-auto`}
        >
            {children}
        </div>
    )
}