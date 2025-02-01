import { MouseEventHandler } from 'react';

import { twMerge } from 'tailwind-merge';

interface MenuProps {
    isVisible: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Menu = ({ isVisible, onClick }: MenuProps) => {
    const classes = twMerge('relative flex flex-col items-center justify-center w-5 h-5 gap-1 transition-all duration-300 ease-in-out',
        isVisible ? '*:bg-red-500 *:hover:bg-red-500/60' : 'ml-4 *:bg-green-800 *:hover:bg-green-800/60'
    );

    const baseClasses = 'block w-full h-0.5 bg-green-800 transition-all duration-300';

    return (
        <span
            className={classes}
            onClick={onClick}
        >
            <span
                className={twMerge(baseClasses, isVisible ? 'rotate-45 translate-y-1.5' : '')}
            ></span>
            <span
                className={twMerge(baseClasses, isVisible ? 'opacity-0' : '')}
            ></span>
            <span
                className={twMerge(baseClasses, isVisible ? '-rotate-45 -translate-y-1.5' : '')}
            ></span>
        </span>
    );
}