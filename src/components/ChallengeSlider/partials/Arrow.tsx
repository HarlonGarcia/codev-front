import { IconType } from 'react-icons';

import { twMerge } from 'tailwind-merge';

interface ArrowProps {
    icon: IconType;
    className?: string;
    onClick?: () => void;
}

export const Arrow = ({
    icon: Icon,
    onClick,
    className,
}: ArrowProps) => {
    const classes = twMerge('cursor-pointer before:hidden',
        className,
    )

    return (
        <button className={classes} onClick={onClick}>
            <Icon className='w-8 h-8 fill-pink-700' />
        </button>
    )
}