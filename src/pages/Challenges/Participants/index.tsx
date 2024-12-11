import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Badge } from 'components/Badge';
import { Avatar } from 'components/shared/Avatar';
import { UserLink } from 'components/shared/UserLink';
import { LuUser } from "react-icons/lu";
import { MdArrowBackIosNew } from "react-icons/md";
import { useParticipants } from 'services/challenge';
import { getBase64Image } from 'utils';

import { PreviewDemo } from './PreviewDemo';
import * as S from './styles';

export default function Participants() {
    const { t } = useTranslation();
    const { id: challengeId } = useParams();
    const navigate = useNavigate();

    const { data: participants = [] } = useParticipants(challengeId);

    if (!participants || 0 >= participants.length) {
        return;
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
                            <th className='rounded-tl-md'>
                                <LuUser size={20} />
                            </th>
                            <th>
                                {t('pages.challenge_users.table.columns.name')}
                            </th>
                            <th>
                                {t('pages.challenge_users.table.columns.github')}
                            </th>
                            <th>
                                {t('pages.challenge_users.table.columns.solution')}
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
                                    <PreviewDemo
                                        url='demo.com'
                                        preview={'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Ntb254amQzMmdhZzl0cnBjMnY4MjZ1a3I0cWFvdHdldmVvc3F3ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kCVIL0CLNWv2E/giphy.webp'}
                                    />
                                </td>
                                <td>
                                    <div className='flex flex-wrap gap-2'>
                                        {labels?.slice(0, 2).map(({ id, title }) => (
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