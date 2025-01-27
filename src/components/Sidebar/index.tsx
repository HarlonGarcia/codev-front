import {
    Dispatch,
    MouseEvent,
    MouseEventHandler,
    SetStateAction,
    useContext,
    useLayoutEffect,
    useState,
} from 'react';
import { Trans } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { Avatar } from 'components/shared/Avatar';
import { AuthContext } from 'contexts/AuthContext';
import { FaChartBar } from "react-icons/fa";
import { FaCodeMerge } from "react-icons/fa6";
import { TbMessageQuestion } from "react-icons/tb";
import { twMerge } from 'tailwind-merge';
import { getBase64Image } from 'utils';
import { URL_DISCORD } from 'utils/constants';

interface SidebarProps {
    isVisible: boolean;
    setIsVisible: Dispatch<SetStateAction<boolean>>;
}

interface MenuProps {
    isVisible: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const links = [
    {
        icon: <FaChartBar className='w-5 h-5' />,
        path: '',
        translationKey: 'pages.dashboard.sidebar.routes.stats',
    },
    {
        icon: <FaCodeMerge className='w-5 h-5' />,
        path: 'challenges',
        translationKey: 'pages.dashboard.sidebar.routes.challenges',
    },
];

const Menu = ({ isVisible, onClick }: MenuProps) => {
    const classes = twMerge('relative flex flex-col items-center justify-center w-5 h-5 gap-1',
        isVisible ? '*:bg-red-500' : '*:bg-green-800 ml-4'
    );

    const baseClasses = 'block w-full h-0.5 bg-green-800 transition-all duration-300';

    return (
        <button
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
        </button>
    );
}

export default function Sidebar(props: SidebarProps) {
    const { isVisible, setIsVisible } = props;

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [activePage, setActivePage] = useState(0);

    const sidebarClasses = twMerge('z-[1] fixed top-[3.25rem] left-0 flex flex-col h-[calc(100%-3.25rem)] w-64 transition-all duration-300 ease-in-out bg-purple-800 p-8',
        isVisible ? 'translate-x-0' : '-translate-x-[13rem]'
    );

    const navItemClasses = 'flex items-center gap-3 py-3 px-4 list-none cursor-pointer transition-all duration-300 ease-in-out text-pink-100 rounded-lg font-semibold hover:bg-purple-900/30';

    const overlayClasses = twMerge('z-[1] fixed top-0 left-0 w-screen h-screen bg-purple-900/90 transition-all duration-300 ease-in-out',
        isVisible ? 'fixed' : 'hidden'
    );

    const toggleClasses = twMerge('fixed top-0 right-0 flex justify-center w-16 h-full py-5',
        'before:content-[""] before:absolute before:inset-0 before:w-16 before:bg-purple-800 before:translation-all before:duration-300 before:ease-in-out',
        isVisible ? 'before:-translate-x-0 before:h-32' : 'before:translate-x-0'
    );

    const toggleVisibility = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsVisible((prevState) => !prevState)
    };

    const handlePageChange = (index: number) => {
        setActivePage(index);
        setIsVisible(false);
    }

    useLayoutEffect(function syncItemSelectedWithPage() {
        const pathIndex = links
            .findIndex(({ path }) => path === window.location.pathname.split('/')[2]);

        setActivePage(-1 === pathIndex ? 0 : pathIndex);
    }, []);

    return (
        <div>
            <div className={overlayClasses}></div>
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

                <hr className='mb-8 border border-purple-700' />
                <nav className='flex flex-col gap-1'>
                    {links.map(({ path, translationKey, icon }, index) => (
                        <Link
                            to={path}
                            key={index}
                            onClick={() => handlePageChange(index)}
                            className={`
                                ${navItemClasses}
                                ${activePage === index && 'text-pink-700 bg-purple-900/30'}
                            `}
                        >
                            {icon}
                            <Trans>{translationKey}</Trans>
                        </Link>
                    ))}
                </nav>

                <div className='mt-auto'>
                    <a
                        className={navItemClasses}
                        href={URL_DISCORD}
                        target={'_blank'}
                        rel={"noopener noreferrer"}
                    >
                        <TbMessageQuestion className='w-5 h-5' />
                        <Trans>{'pages.dashboard.sidebar.support'}</Trans>
                    </a>
                </div>
            </div>
        </div>
    );
}