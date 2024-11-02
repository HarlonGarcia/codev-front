import { Children, PropsWithChildren } from 'react'

interface AvatarGroupProps {
    onClick: () => void;
    max: number;
}

export const AvatarGroup = ({
    onClick,
    max,
    children,
}: PropsWithChildren<AvatarGroupProps>) => {
    const childs = Children.toArray(children).slice(0, max);

    return (
        <div className='flex -space-x-2' onClick={onClick}>
            {childs.map((child, index) => (
                <div
                    key={index}
                    className="rounded-full border border-green-800"
                >
                    {child}
                </div>
            ))}
        </div>
    )
}
