import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { Avatar } from 'components/shared/Avatar';
import { AuthContext } from 'contexts/AuthContext';
import { FaChartBar  } from "react-icons/fa";
import { FaCodeMerge, FaArrowLeft  } from "react-icons/fa6";
import { TbMessageQuestion } from "react-icons/tb";
import { getBase64Image } from 'utils';
import { URL_DISCORD } from 'utils/constants';

import * as S from './styles';

interface SidebarProps {
  visible?: boolean;
  setVisible: (value: boolean) => void;
}

export default function Sidebar({
    visible = false,
    setVisible,
}: SidebarProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { user } = useContext(AuthContext);

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

            <S.Body>
                <hr className={'border border-pink-100'} />
                <S.List>
                    <Link to={''}>
                        <FaChartBar />
                        <span>{t('pages.dashboard.sidebar.routes.stats')}</span>
                    </Link>
                    <Link to={'challenges'}>
                        <FaCodeMerge />
                        <span>{t('pages.dashboard.sidebar.routes.challenges')}</span>
                    </Link>
                </S.List>
            </S.Body>

            <S.Footer>
                <a
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