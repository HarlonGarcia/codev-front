import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import * as Popover from '@radix-ui/react-popover';
import { AuthContext } from 'contexts/AuthContext';
import { AiFillHome } from 'react-icons/ai';
import { FaCodeBranch } from 'react-icons/fa';
import { IoLanguage } from 'react-icons/io5';
import { LuLogIn, LuLogOut } from 'react-icons/lu';
import { MdRoute } from 'react-icons/md';

import * as S from './styles';

export default function Menu() {
    const { t } = useTranslation();
    const { isAuthenticated, logout, changeLanguage } = useContext(AuthContext);

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <S.PopoverTrigger aria-label='List all pages'>
                    <MdRoute />
                </S.PopoverTrigger>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content sideOffset={5}>
                    <S.Content>
                        <Link to='/'>
                            <AiFillHome />
                            <span>{t('components.menu.home')}</span>
                        </Link>
                        {isAuthenticated && (
                            <>
                                <Link to='/challenges'>
                                    <FaCodeBranch />
                                    <span>{t('components.navbar.challenges')}</span>
                                </Link>
                                <button onClick={logout}>
                                    <LuLogOut />
                                    <span>{t('components.navbar.logout')}</span>
                                </button>
                            </>
                        )}
                        {!isAuthenticated && (
                            <Link to='/signin'>
                                <LuLogIn />
                                <span>{t('components.navbar.signin')}</span>
                            </Link>
                        )}
                        <button onClick={changeLanguage}>
                            <IoLanguage />
                            <span>{t('global.translation.change')}</span>
                        </button>
                    </S.Content>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}