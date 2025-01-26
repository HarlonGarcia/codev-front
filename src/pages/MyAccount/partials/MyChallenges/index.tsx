import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import imagePlaceholder from 'assets/images/card-image-placeholder-2.png';
import { challengeStatuses, getChallengeStatus } from 'enums/challengeStatus';
import { motion } from 'framer-motion';
import { RiEmotionSadLine } from "react-icons/ri";
import { useUserChallenges } from 'services/user';
import { twMerge } from 'tailwind-merge';
import { getBase64Image } from 'utils';

import { Wrapper } from '../Wrapper';

const MAX_TECHS_DISPLAYED = 6;

const containerVariants = {
    visible: {
        transition: {
            ease: 'easeInOut',
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 1,
            ease: 'easeInOut',
        },
    },
};

const statusesVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            ease: 'easeInOut',
        },
    },
};

export default function MyChallenges() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { data: challenges = [] } = useUserChallenges({
        enabled: true,
    });

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
                <div className='flex flex-col items-center self-center text-xl text-center text-pink-900'>
                    <RiEmotionSadLine className='mb-4 text-7xl' />
                    {t('pages.account.challenges.none_challenge')}
                </div>
            )}
            {hasChallenges && (
                <motion.div
                    variants={containerVariants}
                    initial='hidden'
                    animate='visible'
                    className='flex flex-wrap gap-4 mb-16 lg:gap-8'
                >
                    {Object.values(challengeStatuses).map(({ id, label, color }) => (
                        <motion.div
                            key={id}
                            variants={statusesVariants}
                            className='flex items-center gap-2 text-pink-100'
                        >
                            <div className='w-2 h-2 rounded-full' style={{ backgroundColor: color }}></div>
                            <span>{label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            )}
            <motion.section
                variants={containerVariants}
                initial='hidden'
                animate='visible'
                className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8 2xl:grid-cols-4'
            >
                {challenges.map(({
                    id,
                    title,
                    status,
                    image,
                    technologies,
                }) => {
                    const techs = technologies.slice(0, MAX_TECHS_DISPLAYED);
                    const techsRemaining = getTechsRemaining(technologies);

                    const isInProgress = status === challengeStatuses.IN_PROGRESS.id;
                    const isToBegin = status === challengeStatuses.TO_BEGIN.id;
                    const isFinishedOrCanceled = status === challengeStatuses.CANCELED.id
                        || status === challengeStatuses.FINISHED.id;

                    const challengeStatus = getChallengeStatus(status);
                    const imageSource = image?.file
                        ? getBase64Image(image.file)
                        : imagePlaceholder;

                    const classes = twMerge(
                        'p-8 bg-purple-800 rounded-xl border-2 border-[transparent] transition-all duration-300 ease-in-out sm:p-4 md:p-8',
                        isInProgress && 'hover:border-green-800',
                        isToBegin && 'hover:border-blue-500',
                        isFinishedOrCanceled && 'hover:border-red-500',
                    );

                    return (
                        <motion.div
                            key={id}
                            title={challengeStatus?.label}
                            variants={itemVariants}
                            className={classes}
                        >
                            <img
                                className='w-full mb-6 rounded-lg max-h-72'
                                src={imageSource}
                                alt={title}
                            />
                            <h3 className='mb-3 text-lg text-green-800'>{title}</h3>                  
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
                                    className='w-full p-3 font-semibold text-white transition-all duration-300 ease-in-out bg-purple-700 rounded-lg hover:bg-purple-700/80 hover:text-pink-900'
                                    onClick={() => navigate(`/challenges/${id}`)}
                                >
                                    {t('pages.challenges.see_challenge')}
                                </button>
                            </div>
                        </motion.div>            
                    )
                })}
            </motion.section>
        </Wrapper>
    );
}
