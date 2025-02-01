import { Trans } from 'react-i18next';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

interface Item {
    path: string;
    i18nKey: string;
}

interface NavGroupProps {
    groupName: string; 
    icon: IconType;
    items: Item[];
    onItemClick?: () => void;
}

export const NavGroup = ({
    icon: Icon,
    groupName,
    items,
    onItemClick,
}: NavGroupProps) => {
    const currentPath = window.location.pathname.replace(/^\/dashboard\/?/, '');

    const itemClasses = 'group flex gap-6 list-none cursor-pointer transition-all duration-300 ease-in-out text-pink-100 rounded-lg font-semibold hover:text-pink-700';

    return (
        <div
            className='flex flex-col gap-4 font-semibold text-pink-100 list-none transition-all duration-300 ease-in-out rounded-lg'
        >
            <Link
                to={items[0].path}
                onClick={onItemClick}
                className='flex items-center gap-3 text-sm text-pink-900/60'
            >
                <Icon className='w-4 h-4' />
                <Trans>{groupName}</Trans>
            </Link>
            <div className='relative'>
                <div className='absolute w-0.5 h-full bg-purple-300/20'></div>
                <div className='flex flex-col h-full gap-3'>
                    {items.map(({ path, i18nKey }, index) => (
                        <Link
                            to={path}
                            key={index}
                            onClick={onItemClick}
                            className={`
                                ${itemClasses}
                                ${currentPath === path && 'text-pink-700'}
                            `}
                        >
                            <div
                                className={
                                    `opacity-0 w-0.5 h-full bg-purple-300
                                    ${currentPath === path && 'opacity-100'}`
                                }
                            >    
                            </div>
                            <span className='transition-all duration-200 ease-in-out group-hover:translate-x-2'>
                                <Trans>{i18nKey}</Trans>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}