import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Divider } from '@chakra-ui/react';
import UserAvatar from 'components/Navbar/partials/UserAvatar';
import { FaChartBar  } from "react-icons/fa";
import { FaCodeMerge, FaArrowLeft  } from "react-icons/fa6";
import { TbMessageQuestion } from "react-icons/tb";
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
  const { t } = useTranslation();

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
        <UserAvatar
          size='xl'
          redirect
          hidePopover
        />
      </S.Header>

      <S.Body>
        <Divider />
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