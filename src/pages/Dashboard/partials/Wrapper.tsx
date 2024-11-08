import { PropsWithChildren } from 'react'

export const Wrapper = ({ children }: PropsWithChildren) => {
    return (
        <div className='mx-auto 4xl:max-w-screen-4xl'>
            {children}
        </div>
    )
}
