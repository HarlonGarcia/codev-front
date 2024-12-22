import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Wrapper } from 'components/shared/Wrapper';
import { motion } from 'framer-motion';
import { useChallenges } from 'services/challenge';
import { twMerge } from 'tailwind-merge';
import { gsap} from 'utils/gsap';

import { WelcomeSection } from './partials/Welcome';
import {
    containerVariants,
    itemVariants,
    possibilities,
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
        const targetsShown = 4;

        const duration = 1;
        const pause = 0.75;
        const itemSize = 140;
        const unitOfMeasure = "px";

        const targets = gsap.utils.toArray(".codev-home-technologies > div");

        const repeatDelay = (targets.length - targetsShown) * (pause + duration) - duration;

        gsap.set(targets, {
            width: itemSize + unitOfMeasure,
            right: -itemSize + unitOfMeasure,
            scale: 0
        });

        gsap.set(".codev-home-technologies", {
            width: itemSize * targetsShown + unitOfMeasure,
            height: itemSize + unitOfMeasure
        });

        const parentTimeline = gsap.timeline();

        (targets as HTMLElement[]).forEach((element, index) => {
            element.style.zIndex = String(targetsShown - index);
            
            const timeline = gsap.timeline({
                delay: index * (duration + pause),
                defaults: { duration, ease: "power3.inOut" },
                repeat: -1,
                repeatDelay,
            });

            timeline.fromTo(
                element,
                { scale: 0, transformOrigin: "right center", xPercent: "100" },
                { scale: 1, transformOrigin: "left center", xPercent: "-=100" });

            for (let i = 1; i < targetsShown; i++) {
                timeline.to(element, { xPercent: "-=100" }, "+=" + pause);
            }

            timeline.to(
                element,
                { scale: 0, transformOrigin: "right center", xPercent: "-=100" },
                "+=" + pause
            );

            parentTimeline.add(timeline, 0);
        });

        const prep = targetsShown * (duration + pause) - pause;
        parentTimeline.time(prep);
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
                <p className='mb-8 text-center text-lg font-semibold lg:mb-12 lg:text-xl'>
                    {t('pages.home.introduction.description')}
                </p>
                <motion.ul
                    className='flex flex-wrap justify-center gap-8'
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 2.5 }}
                >
                    {possibilities.map(({ label, icon }, index) => {
                        const classes = twMerge(
                            'flex flex-col justify-center items-center h-44 w-4/5 gap-2 p-6 bg-purple-800 rounded-xl text-center transition-all duration-200 ease-in-out shadow-3xl shadow-purple-600/50 sm:w-48 xl:w-56',
                            index % 2 !== 0 ? 'md:animate-floatingDeeper' : 'md:animate-floating',
                        );

                        return (
                            <motion.li  
                                key={index}
                                className={classes}
                                variants={itemVariants}
                            >
                                <span className='text-pink-100 mb-3'>
                                    {label}
                                </span>
                                {icon}
                            </motion.li>
                        )})}
                </motion.ul>
            </motion.div>

            <motion.div
                className='codev-home-section'
                {...sectionAnimationProps}
            >
                <h2 className='mb-6 text-purple-300 text-center xl:mb-8'>
                    {t('pages.home.technologies.title')}
                </h2>
                <p className='mb-8 text-center text-lg font-semibold lg:mb-12 lg:text-xl'>
                    <Trans
                        components={{ code: <code className='text-sm font-semibold bg-pink-700 text-purple-900 py-1 px-1 rounded' /> }}
                    >
                        {'pages.home.technologies.description'}
                    </Trans>
                </p>
                <div className='hidden codev-home-technologies w-auto h-auto relative mx-auto xl:flex'>
                    {technologies.map((icon, index) => (
                        <div
                            className='grid aspect-square place-items-center absolute top-0 left-3/4 p-4 bg-purple-900'
                            key={index}
                        >
                            {icon}
                        </div>
                    ))}
                </div>
                <div className='flex justify-center flex-wrap gap-4 xl:hidden'>
                    {technologies.map((icon, index) => (
                        <div
                            className='w-16 md:w-20'
                            key={index}
                        >
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
                    <p className='mb-8 text-center text-lg font-semibold lg:mb-12 lg:text-xl'>
                        {t('pages.home.challenges.description')}
                    </p>
                    <div className='relative'>
                        <div className='flex flex-col items-center gap-4'>
                            {challenges.map(({ id, title }) => (
                                <div
                                    key={id}
                                    className='flex justify-between items-center w-11/12 p-5 bg-purple-800 rounded-lg xl:rounded-2xl'
                                >
                                    <span className='md:text-xl'>{title}</span>
                                    <small className='py-1.5 px-2 text-xs text-green-800 font-semibold bg-green-900/30 border border-green-900 rounded-lg uppercase'>
                                        {t('pages.home.challenges.badge')}
                                    </small>
                                </div>
                            ))}
                        </div>
                        <div className='codev-home-hide-challenges' />
                    </div>
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