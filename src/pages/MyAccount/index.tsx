import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Badge } from 'components/Badge';
import { Avatar } from 'components/shared/Avatar';
import { AuthContext } from 'contexts/AuthContext';
import { FaGithub } from 'react-icons/fa';
import { ImLink } from 'react-icons/im';
import { useUserChallenges } from 'services/user';
import { getUrlWithoutPrefix } from 'services/utils';
import { getBase64Image } from 'utils';
import { ADMIN } from 'utils/constants';

import * as S from './styles';
import { IUserOption, options, adminOptions } from './utils';

const MAX_LABELS_DISPLAYED = 5;

export default function MyAccount() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const { isFetching: isLoadingChallenges } = useUserChallenges();

    const handleActions = ({ action, redirectUrl }: IUserOption) => {
        if (action) {
            action();
        }

        if (redirectUrl) {
            navigate(redirectUrl);
        }
    };

    const links = useMemo(() => {
        if (!user) {
            return [];
        }

        const { additionalUrl, githubUrl } = user;

        const items = [{
            url: getUrlWithoutPrefix(githubUrl),
            icon: <FaGithub />,
        }]

        if (additionalUrl) {
            items.push({
                url: getUrlWithoutPrefix(additionalUrl),
                icon: <ImLink />,
            });
        }

        return items;
    }, [user]);

    if (!user) {
        return;
    }

    const isAdmin = user.roles?.some((role) => ADMIN === role.name);
    const userLabels = user.labels || [];
    const labels = userLabels.slice(0, MAX_LABELS_DISPLAYED);

    const labelsRemainingCount = MAX_LABELS_DISPLAYED < userLabels.length
        ? userLabels.length - MAX_LABELS_DISPLAYED
        : 0;
  
    return (
        <S.Container>
            <div>
                <S.AccountHeader>
                    <Avatar
                        border
                        size={'xl'}
                        name={user.name}
                        url={getBase64Image(user.image?.file)}
                    />
                    <S.AccountInfo>
                        <h2>{user.name}</h2>
                        <div>
                            {labels.map(({ id, title }, index) => (
                                <Badge
                                    border='animated'
                                    key={id + index}
                                >
                                    {title}
                                </Badge>
                            ))}
                            {labelsRemainingCount > 0 && (
                                <Badge border='purple'>
                +{labelsRemainingCount}
                                </Badge>
                            )}
                        </div>
                    </S.AccountInfo>
                </S.AccountHeader>
                <S.AccountContent loading={isLoadingChallenges}>
                    {options.map((option, index) => (
                        <S.Option
                            key={index}
                            onClick={() => handleActions(option)}
                        >
                            {option.icon}
                            {option.label}
                        </S.Option>
                    ))}
                    {isAdmin && (
                        <>
                            <S.Divider />
                            <S.OptionsWrapper>
                                <h3>{t('pages.account.options.admin.title')}</h3>
                                <div>
                                    {adminOptions.map((option, index) => (
                                        <S.Option
                                            key={index}
                                            onClick={() => handleActions(option)}
                                        >
                                            {option.icon}
                                            {option.label}
                                        </S.Option>
                                    ))}
                                </div>
                            </S.OptionsWrapper>
                        </>
                    )}
                    <S.Divider />
                    <S.OptionsWrapper>
                        <h3>{t('pages.account.options.contacts.title')}</h3>
                        <div>
                            {links.map(({ url, icon }, index) => (
                                <S.Contact key={index}>
                                    {icon}
                                    <span>{url}</span>
                                </S.Contact>
                            ))}
                        </div>
                    </S.OptionsWrapper>
                </S.AccountContent>
                <S.AccountFooter>
                    <button onClick={logout}>
                        {t('pages.account.logout')}
                    </button>
                </S.AccountFooter>
            </div>
        </S.Container>
    );
}
