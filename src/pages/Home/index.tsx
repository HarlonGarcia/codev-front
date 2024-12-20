import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Wrapper } from 'components/shared/Wrapper';
import { motion } from 'framer-motion';
import { useChallenges } from 'services/challenge';

import { WelcomeSection } from './partials/Welcome';
import * as S from './styles';
import {
    containerVariants,
    itemVariants,
    possibilities,
    runInfiniteSliderAnimation,
    sectionAnimationProps,
    technologies,
} from './utils';

export default function Home() {
    const { t } = useTranslation();
    
    const { data: challenges = [] } = useChallenges({
        page: 0,
        size: 4,
    });

    useEffect(function animateTechnologies() {
        runInfiniteSliderAnimation();
    }, []);
    

    return (
        <Wrapper>
            <WelcomeSection />
            <motion.div
                className='codev-home-section'
                {...sectionAnimationProps}
            >
                <h2 className='mb-6 text-purple-300 text-center xl:mb-8'>
                    {t('pages.home.introduction.title')}
                </h2>
                <p className='mb-8 text-center text-lg font-semibold lg:text-xl'>
                    {t('pages.home.introduction.description')}
                </p>
                <S.Possibilities
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 2.5 }}
                >
                    {possibilities.map(({ id, label, icon }, index) => (
                        <S.CardItem
                            key={id}
                            animation={index % 2 !== 0 ? 'diff' : undefined}
                            variants={itemVariants}
                        >
                            {label}
                            {icon}
                        </S.CardItem>
                    ))}
                </S.Possibilities>
            </motion.div>

            <motion.div
                className='codev-home-section'
                {...sectionAnimationProps}
            >
                <h2 className='mb-6 text-purple-300 text-center xl:mb-8'>
                    {t('pages.home.technologies.title')}
                </h2>
                <p className='mb-8 text-center text-lg font-semibold lg:text-xl'>
                    {t('pages.home.technologies.description')}
                </p>
                <div className='codev-home-technologies w-auto h-auto relative'>
                    {technologies.map((icon, index) => (
                        <div className='aspect-square grid place-items-center absolute top-0 p-4 bg-purple-900' key={index}>
                            {icon}
                        </div>
                    ))}
                </div>
            </motion.div>

            {challenges.length > 0 && (
                <motion.div
                    className='codev-home-section'
                    {...sectionAnimationProps}
                >
                    <h2 className='mb-6 text-purple-300 text-center xl:mb-8'>
                        {t('pages.home.challenges.title')}
                    </h2>
                    <p className='mb-8 text-center text-lg font-semibold lg:text-xl'>
                        {t('pages.home.challenges.description')}
                    </p>
                    <S.LatestChallenges>
                        <S.ChallengeList>
                            {challenges.map(({ id, title }) => (
                                <div key={id}>
                                    <small>{title}</small>
                                    <span>{t('pages.home.challenges.badge')}</span>
                                </div>
                            ))}
                        </S.ChallengeList>
                        <div className='expand_challenges' />
                    </S.LatestChallenges>
                    <Link
                        className='text-center text-green-800 text-lg transition-all duration-300 ease-in-out hover:text-green-900 lg:text-xl'
                        to='/challenges'
                    >
                        {t('pages.home.challenges.button.text')}
                    </Link>
                </motion.div>
            )}
        </Wrapper>
    );
}