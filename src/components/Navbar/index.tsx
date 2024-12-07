import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import Menu from 'components/Menu';
import { Avatar } from 'components/shared/Avatar';
import { AuthContext } from 'contexts/AuthContext';
import { GlobalContext } from 'contexts/GlobalContext';
import { AiFillHome } from 'react-icons/ai';
import { FaCodeBranch } from 'react-icons/fa';
import { IoLanguage } from "react-icons/io5";
import { LuLogIn, LuLogOut } from 'react-icons/lu';
import { MdLeaderboard   } from "react-icons/md";
import { getBase64Image } from 'utils';

import * as S from './styles';

export default function Navbar() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { changeLanguage } = useContext(GlobalContext);
    const {
        user,
        isAuthenticated,
        isAdmin,
        logout,
    } = useContext(AuthContext);

    return (
        <div className='nav-size flex justify-between items-center fixed w-screen px-8 z-10
            border-b border-purple-800 backdrop-blur-sm'>
            <Link to='/'>
                <h3 className='text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-700 bg-clip-text text-[transparent]'>
                    Codev
                </h3>
            </Link>
            <S.Navigation>
                <S.NavItems>
                    <Link to='/'>
                        <AiFillHome />
                        <span>{t('components.navbar.home')}</span>
                    </Link>
                    {isAuthenticated && isAdmin && (
                        <Link to='/dashboard'>
                            <MdLeaderboard   />
                            <span>{t('components.navbar.dashboard')}</span>
                        </Link>
                    )}
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
                </S.NavItems>

                <S.LanguageToggle
                    onClick={changeLanguage}
                    title={t('global.translation.change')}
                >
                    <IoLanguage />
                </S.LanguageToggle>

                {isAuthenticated && (
                    <Avatar
                        border
                        name={user?.name}
                        size={'sm'}
                        url={getBase64Image(user?.image?.file)}
                        onClick={() => navigate('/account')}
                    />
                )}
            </S.Navigation>
            <Menu />
        </div>
    );
}
