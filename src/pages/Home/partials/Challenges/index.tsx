import { useEffect, useRef } from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useChallenges } from 'services/challenge';

const containerVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
            delay: 0.5,
            ease: 'easeInOut',
            delayChildren: 0.75,
            staggerChildren: 0.2,
            staggerDirection: 1,
        },
    },
};

export const itemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
};

export const Challenges = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const animation = useAnimation();

    const { data: challenges = [] } = useChallenges({
        page: 0,
        size: 4,
    });

    useEffect(function startSectionAnimations() {
        if (isInView) {
            animation.start('visible');
        }
    }, [isInView]);
    
    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial='hidden'
            animate={animation}
            className='codev-home-section'
        >
            <h2 className='mb-6 text-center text-purple-300 xl:mb-8'>
                <Trans>{'pages.home.challenges.title'}</Trans>
            </h2>
            <p className='mb-8 text-lg font-semibold text-center lg:mb-12 lg:text-xl'>
                <Trans>{'pages.home.challenges.description'}</Trans>
            </p>
            <div className='relative'>
                <div className='flex flex-col items-center gap-4'>
                    {challenges.map(({ id, title }) => (
                        <motion.div
                            key={id}
                            variants={itemVariants}
                            className='flex items-center justify-between w-11/12 p-5 bg-purple-800 rounded-lg xl:rounded-2xl'
                        >
                            <span className='md:text-xl'>{title}</span>
                            <small className='py-1.5 px-2 text-xs text-green-800 font-semibold bg-green-900/30 border border-green-900 rounded-lg uppercase'>
                                <Trans>{'pages.home.challenges.badge'}</Trans>
                            </small>
                        </motion.div>
                    ))}
                </div>
                <div className='codev-home-hide-challenges' />
            </div>
            <Link
                to='/challenges'
                className='text-lg text-center text-green-800 transition-all duration-300 ease-in-out hover:text-green-900 lg:text-xl'
            >
                <Trans>{'pages.home.challenges.button.text'}</Trans>
            </Link>
        </motion.div>
    )
}
