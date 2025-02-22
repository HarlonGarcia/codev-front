import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Badge } from 'components/Badge';
import { CreateSolutionModal } from 'components/Modal/CreateSolutionModal';
import { Avatar } from 'components/shared/Avatar';
import { LuPlus, LuArrowLeft } from "react-icons/lu";
import { useParticipants } from 'services/challenge';
import { useSolutions } from 'services/solutions';
import { getBase64Image } from 'utils';

import { PreviewDemo } from './PreviewDemo';

export default function Participants() {
    const { t } = useTranslation();
    const { id: challengeId } = useParams();
    const navigate = useNavigate();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const { data: allParticipants = [] } = useParticipants(challengeId);
    const { data: solutions = [] } = useSolutions(challengeId);

    const participants = useMemo(() => {
        return allParticipants.map((participant) => {
            const linkedSolution = solutions.find(({ author }) => author.id === participant.id);

            return {
                ...participant,
                solution: linkedSolution,
            };
        });
    }, [allParticipants, solutions]);

    useEffect(function handleWindowResize() {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className='max-w-[80rem] mx-auto pt-32 px-6 sm:px-10'>
            <CreateSolutionModal
                visible={isModalVisible}
                onConfirm={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
            />
            <button
                className='flex items-center gap-2 px-4 py-2 mb-8 transition-all duration-300 ease-in-out bg-purple-800 rounded-lg group'
                onClick={() => navigate(-1)}
            >
                <LuArrowLeft
                    className='transition-all duration-200 ease-in-out group-hover:-translate-x-0.5'
                />
                <span>{t('pages.challenge_users.button.return')}</span>
            </button>
            <div className='flex flex-col gap-4'>
                <button
                    onClick={() => setIsModalVisible(true)}
                    className='flex items-center gap-2 p-4 text-green-800 border border-green-900 bg-green-900/10 rounded-xl'
                >
                    <LuPlus size={20} />
                    <span>{t('pages.challenge_users.solution.submit')}</span>
                </button>
                {participants.map(({
                    id,
                    name,
                    image,
                    labels,
                    solution,
                }) => {
                    const labelsShown = windowWidth > 778 ? 2 : 1;
                    const solutionUrl = solution?.deployUrl || solution?.repositoryUrl;

                    return (
                        <div key={id} className='flex items-center gap-6 px-6 py-4 text-pink-700 bg-purple-800 rounded-xl'>
                            <Avatar
                                size='sm'
                                name={name}
                                url={getBase64Image(image?.file)}
                            />
                            <div className='flex flex-col w-20 xs:w-32 sm:w-40 md:w-48'>
                                <span className='text-sm font-semibold text-pink-900/60'>
                                    {t('pages.challenge_users.table.columns.name')}
                                </span>
                                <span className='overflow-hidden font-fira text-nowrap text-ellipsis'>
                                    {name}
                                </span>
                            </div>
                            <div className='flex flex-col ml-auto sm:ml-0'>
                                <span className='text-sm font-semibold text-pink-900/60'>
                                    {t('pages.challenge_users.table.columns.solution')}
                                </span>
                                <PreviewDemo
                                    url={solutionUrl}
                                    preview={undefined}
                                />
                            </div>
                            <div className='flex-wrap justify-end hidden gap-2 ml-auto sm:flex'>
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
        </div>
    );
}