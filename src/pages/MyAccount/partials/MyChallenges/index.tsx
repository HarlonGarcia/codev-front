import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { challengeStatuses, getChallengeStatus } from 'enums/challengeStatus';
import { RiEmotionSadLine } from "react-icons/ri";
import { useUserChallenges } from 'services/user';
import { getBase64Image } from 'utils';

import imagePlaceholder from '../../../../../public/images/card-image-placeholder-2.png';
import { Wrapper } from '../Wrapper';

const MAX_TECHS_DISPLAYED = 6;

export default function MyChallenges() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { data: challenges = [] } = useUserChallenges();

    const getTechsRemaining = (techs: ITechnology[]) => {
        return MAX_TECHS_DISPLAYED < techs.length
            ? techs.length - MAX_TECHS_DISPLAYED
            : 0
    };

    const hasChallenges = 0 < challenges.length;

    return (
        <Wrapper
            redirectPath='/account'
            title={t('pages.account.challenges.title')}
        >
            {!hasChallenges && (
                <div className='flex flex-col items-center self-center text-center text-xl text-pink-900'>
                    <RiEmotionSadLine className='text-7xl mb-4' />
                    {t('pages.account.challenges.none_challenge')}
                </div>
            )}
            {hasChallenges && (
                <div className='flex flex-wrap gap-8 mb-16'>
                    {Object.values(challengeStatuses).map(({ id, label, color }) => (
                        <div className='flex items-center gap-2 text-pink-100' key={id}>
                            <div className='w-2 h-2 rounded-full' style={{ backgroundColor: color }}></div>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            )}
            <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8 2xl:grid-cols-4'>
                {challenges.map(({ id, title, status, image, technologies }) => {
                    const techs = technologies.slice(0, MAX_TECHS_DISPLAYED);

                    const techsRemaining = getTechsRemaining(technologies);
                    const challengeStatus = getChallengeStatus(status);
                    const imageSource = image?.file ? getBase64Image(image?.file) : imagePlaceholder;

                    return (
                        <div
                            className='w-full p-8 bg-purple-800 rounded-xl sm:p-4 md:p-8'
                            title={challengeStatus?.label}
                            key={id}
                        >
                            <img
                                className='max-h-96 w-full mb-6 rounded-lg'
                                src={imageSource}
                                alt={title}
                            />
                            <h3 className='mb-3 text-green-800 text-lg'>{title}</h3>                  
                            <div className='flex flex-wrap gap-2 font-fira'>
                                {techs.map(({ id, name, color }) => (
                                    <span
                                        key={id}
                                        style={{ color: color }}
                                        className='py-1.5 px-2.5 bg-purple-700 text-pink-700 text-sm rounded-md'
                                    >
                                        {name}
                                    </span>
                                ))}
                                {Boolean(techsRemaining) && (
                                    <span>+{techsRemaining}</span>
                                )}
                            </div>
                            <hr className='my-6 border-t border-purple-700' />
                            <div className='flex justify-center w-full'>
                                <button
                                    className='w-full p-3 font-semibold text-white bg-purple-700 rounded-lg transition-all duration-300 ease-in-out hover:bg-purple-700/80 hover:text-pink-900'
                                    onClick={() => navigate(`/challenges/${id}`)}
                                >
                                    {t('pages.challenges.see_challenge')}
                                </button>
                            </div>
                        </div>            
                    )
                })}
            </section>
        </Wrapper>
    );
}
