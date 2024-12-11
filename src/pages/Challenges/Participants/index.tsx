import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Badge } from 'components/Badge';
import { Avatar } from 'components/shared/Avatar';
import { MdArrowBackIosNew } from "react-icons/md";
import { useParticipants } from 'services/challenge';
import { getBase64Image } from 'utils';

import { PreviewDemo } from './PreviewDemo';
import * as S from './styles';

export default function Participants() {
    const { t } = useTranslation();
    const { id: challengeId } = useParams();
    const navigate = useNavigate();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { data: participants = [] } = useParticipants(challengeId);

    useEffect(function handleWindowResize() {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    if (!participants || 0 >= participants.length) {
        return;
    };
    return (
        <S.Container>
            <button onClick={() => navigate(`/challenges/${challengeId}`)}>
                <MdArrowBackIosNew />
                <span>{t('pages.challenge_users.button.return')}</span>
            </button>
            <div className='flex flex-col gap-4 *:bg-purple-800'>
                {participants.map(({
                    id,
                    name,
                    image,
                    labels,
                }) => {

                    const labelsShown = windowWidth > 778 ? 2 : 1;

                    return (
                        <div key={id} className='flex items-center text-pink-700 py-4 px-6 gap-6 rounded-xl'>
                            <Avatar
                                size='sm'
                                name={name}
                                url={getBase64Image(image?.file)}
                            />
                            <div className='flex flex-col w-20 xs:w-32 sm:w-40 md:w-48'>
                                <span className='text-pink-900/60 text-sm font-semibold'>
                                    {t('pages.challenge_users.table.columns.name')}
                                </span>
                                <span className='font-fira text-nowrap overflow-hidden text-ellipsis'>
                                    {name}
                                </span>
                            </div>
                            <div className='flex flex-col ml-auto sm:ml-0'>
                                <span className='text-pink-900/60 text-sm font-semibold'>
                                    {t('pages.challenge_users.table.columns.solution')}
                                </span>
                                <PreviewDemo
                                    url='demo.com'
                                    preview={'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Ntb254amQzMmdhZzl0cnBjMnY4MjZ1a3I0cWFvdHdldmVvc3F3ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kCVIL0CLNWv2E/giphy.webp'}
                                />
                            </div>
                            <div className='hidden flex-wrap justify-end gap-2 ml-auto sm:flex'>
                                {labels?.slice(0, labelsShown).map(({ id, title }) => (
                                    <Badge border='green' key={id}>
                                        {title}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </S.Container>
    );
}