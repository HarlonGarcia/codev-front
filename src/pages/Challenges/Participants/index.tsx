import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Badge } from 'components/Badge';
import { Avatar } from 'components/shared/Avatar';
import { UserLink } from 'components/shared/UserLink';
import PageNotFound from 'pages/PageNotFound';
import { MdArrowBackIosNew } from "react-icons/md";
import { useParticipants } from 'services/challenge';
import { getBase64Image } from 'utils';

import * as S from './styles';

export default function Participants() {
    const { t } = useTranslation();
    const { id: challengeId } = useParams();
    const navigate = useNavigate();

    const { data: participants = [] } = useParticipants(challengeId);

    if (!participants || 0 >= participants.length) {
        return <PageNotFound />;
    };
    return (
        <S.Container>
            <button onClick={() => navigate(`/challenges/${challengeId}`)}>
                <MdArrowBackIosNew />
                <span>{t('pages.challenge_users.button.return')}</span>
            </button>
            <div>
                <table className='table w-full'>
                    <thead>
                        <tr className='*:text-start *:py-2 *:px-4 *:bg-purple-800 *:text-green-800 *:font-semibold'>
                            <th className='rounded-tl-md'></th>
                            <th>
                                {t('pages.challenge_users.table.columns.name')}
                            </th>
                            <th>
                                {t('pages.challenge_users.table.columns.github')}
                            </th>
                            <th>
                                {t('pages.challenge_users.table.columns.additional_url')}
                            </th>
                            <th className='rounded-tr-md'>
                                {t('pages.challenge_users.table.columns.labels')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className='even:*:bg-purple-800/30'>
                        {participants.map(({
                            id,
                            name,
                            image,
                            githubUrl,
                            additionalUrl,
                            labels,
                        }) => (
                            <tr className='*:p-4' key={id}>
                                <td>
                                    <Avatar
                                        size='sm'
                                        name={name}
                                        url={getBase64Image(image?.file)}
                                    />
                                </td>
                                <td>{name}</td>
                                <td>
                                    <UserLink
                                        href={githubUrl}
                                        spacing
                                        prettify
                                    />
                                </td>
                                <td>
                                    <UserLink
                                        href={additionalUrl}
                                        spacing
                                        prettify
                                    />
                                </td>
                                <td>
                                    <div className='flex flex-wrap gap-2'>
                                        {labels?.slice(0, 3).map(({ id, title }) => (
                                            <Badge border='green' key={id}>
                                                {title}
                                            </Badge>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </S.Container>
    );
}