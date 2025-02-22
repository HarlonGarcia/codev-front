import {
    Dispatch,
    MouseEvent,
    SetStateAction,
    useContext,
} from 'react';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Avatar } from 'components/shared/Avatar';
import { AuthContext } from 'contexts/AuthContext';
import { FaChartBar } from "react-icons/fa";
import { FaCodeMerge } from "react-icons/fa6";
import { TbMessageQuestion } from "react-icons/tb";
import { twMerge } from 'tailwind-merge';
import { getBase64Image } from 'utils';
import { URL_DISCORD } from 'utils/constants';

import { Menu } from './partials/Menu';
import { NavGroup } from './partials/NavGroup';

interface SidebarProps {
    isVisible: boolean;
    setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const navItems = [
    {
        icon: FaChartBar,
        groupName: 'pages.dashboard.sidebar.routes.stats',
        items: [
            {
                path: '',
                i18nKey: 'pages.dashboard.sidebar.routes.stats.list',
            },
        ],    
    },
    {
        icon: FaCodeMerge,
        groupName: 'pages.dashboard.sidebar.routes.challenges',
        items: [
            {
                path: 'challenges',
                i18nKey: 'pages.dashboard.sidebar.routes.challenges.list',
            },
            {
                path: 'challenges/new-challenge',
                i18nKey: 'pages.dashboard.sidebar.routes.challenges.create',
            },
        ],    
    },
];

export default function Sidebar(props: SidebarProps) {
    const { isVisible, setIsVisible } = props;

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const sidebarClasses = twMerge('z-[1] fixed top-[3.25rem] left-0 flex flex-col h-[calc(100%-3.25rem)] w-64 transition-all duration-300 ease-in-out bg-purple-800 p-8',
        isVisible ? 'translate-x-0' : '-translate-x-[13rem]'
    );

    const overlayClasses = twMerge('z-[1] fixed top-0 left-0 w-screen h-screen bg-purple-900/90 transition-all duration-300 ease-in-out',
        isVisible ? 'fixed' : 'hidden'
    );

    const toggleClasses = twMerge('fixed top-0 right-0 flex justify-center w-16 h-full py-5 outline-none',
        'before:content-[""] before:absolute before:inset-0 before:w-16 before:bg-purple-800 before:translation-all before:duration-300 before:ease-in-out',
        isVisible ? 'before:-translate-x-0 before:h-32' : 'before:translate-x-0'
    );

    const toggleVisibility = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsVisible((prevState) => !prevState)
    };

    return (
        <div>
            <div
                className={overlayClasses}
                onClick={() => setIsVisible((prevState) => !prevState)}
            ></div>
            <div className={sidebarClasses}>
                <button
                    className={toggleClasses}
                    onClick={toggleVisibility}
                >
                    <Menu isVisible={isVisible} onClick={toggleVisibility} />
                </button>
                <div className='flex justify-center mb-8'>
                    <Avatar
                        border
                        size={'xl'}
                        url={getBase64Image(user?.image?.file)}
                        name={user?.name}
                        onClick={() => navigate('/account')}
                    />
                </div>
                <hr className='mb-8 border border-purple-300/20' />
                <nav className='flex flex-col gap-7'>
                    {navItems.map((item, index) => (
                        <NavGroup
                            {...item}
                            key={index}
                            onItemClick={() => setIsVisible(false)}
                        />
                    ))}
                </nav>
                <div className='flex flex-col gap-2 mt-auto'>
                    <a
                        className='flex items-center gap-3 font-semibold text-pink-100 list-none transition-all duration-300 ease-in-out rounded-lg cursor-pointer hover:text-pink-700'
                        href={URL_DISCORD}
                        target={'_blank'}
                        rel={"noopener noreferrer"}
                    >
                        <TbMessageQuestion className='w-4 h-4' />
                        <Trans>{'pages.dashboard.sidebar.support'}</Trans>
                    </a>
                </div>
            </div>
        </div>
    );
}