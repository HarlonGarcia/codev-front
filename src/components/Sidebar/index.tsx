import { useContext, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { Avatar } from 'components/shared/Avatar';
import { AuthContext } from 'contexts/AuthContext';
import { FaChartBar  } from "react-icons/fa";
import { FaCodeMerge, FaArrowLeft  } from "react-icons/fa6";
import { TbMessageQuestion } from "react-icons/tb";
import { twMerge } from 'tailwind-merge';
import { getBase64Image } from 'utils';
import { URL_DISCORD } from 'utils/constants';

import * as S from './styles';

interface SidebarProps {
    visible?: boolean;
      setVisible: (value: boolean) => void;
}

const links = [
    {
        icon: <FaChartBar />,
        path: '',
        name: 'pages.dashboard.sidebar.routes.stats',
    },
    {
        icon: <FaCodeMerge />,
        path: 'challenges',
        name: 'pages.dashboard.sidebar.routes.challenges',
    },
];

export default function Sidebar({
    visible = false,
    setVisible,
}: SidebarProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { user } = useContext(AuthContext);

    const [activePage, setActivePage] = useState(0);

    const navItemClasses = twMerge('flex items-center gap-3 py-3 px-4 list-none cursor-pointer transition-all duration-300 ease-in-out text-pink-100 rounded-lg font-semibold hover:bg-purple-900/30');

    useLayoutEffect(() => {
        const pathIndex = links
            .findIndex(({ path }) => path === window.location.pathname.split('/')[2]);

        setActivePage(-1 === pathIndex ? 0 : pathIndex);
    }, [activePage]);

    return (
        <S.Container visible={visible}>
            <S.Toggle
                visible={visible}
                onClick={() => setVisible(!visible)}
            >
                {!visible && (
                    <span>
                        {t('pages.dashboard.sidebar.button.show')}
                    </span>
                )}
                <FaArrowLeft  />
            </S.Toggle>
            <S.Header>
                <Avatar
                    border
                    size={'xl'}
                    url={getBase64Image(user?.image?.file)}
                    name={user?.name}
                    onClick={() => navigate('/account')}
                />
            </S.Header>

            <div>
                <hr className={'border border-purple-700'} />
                <S.List>
                    {links.map(({ path, name, icon }, index) => (
                        <Link
                            to={path}
                            key={index}
                            onClick={() => setActivePage(index)}
                            className={`${navItemClasses} ${activePage === index && 'text-pink-700 bg-purple-900/30'}`}
                        >
                            {icon}
                            <span>{t(name)}</span>
                        </Link>
                    ))}
                </S.List>
            </div>

            <S.Footer>
                <a
                    className={navItemClasses}
                    href={URL_DISCORD}
                    target={'_blank'}
                    rel={"noopener noreferrer"}
                >
                    <TbMessageQuestion />
                    <span>
                        {t('pages.dashboard.sidebar.support')}
                    </span>
                </a>
            </S.Footer>
        </S.Container>
    );
}