import { useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { MagneticButton } from 'components/MagneticButton';
import { useInView, motion, useAnimation } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";
import { LuUser2 } from "react-icons/lu";
import { URL_DISCORD } from 'utils/constants';

const iconContainer = {
    visible: {
        transition: {
            ease: 'easeInOut',
            duration: 0.5,
            staggerChildren: 0.2,
        },
    },
}

const iconVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
}

const inputVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 },
}

const buttonVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
}

export const Footer = () => {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const animation = useAnimation();

    useEffect(function startAnimations() {
        if (isInView) {
            animation.start('visible');
        }
    }, [isInView]);

    return (
        <footer
            className='relative h-[26rem] sm:h-[30rem] xl:h-[34rem]'
            style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
        >
            <div className='fixed bottom-0 h-[26rem] w-full sm:h-[30rem] xl:h-[34rem]'>
                <div className='w-full h-full p-16 bg-gradient-to-r from-purple-800 to-purple-800/45 xl:p-20'>
                    <div className='flex flex-col items-center justify-center'>
                        <h3
                            ref={ref}
                            className='mb-8 text-center text-xl text-pink-100 leading-[150%] lg:text-2xl 2xl:text-3xl'
                        >
                            <Trans
                                components={{ span: <span className='text-green-800' /> }}
                            >
                                {'pages.home.footer.call_to_action'}
                            </Trans>
                        </h3>
                        <div className='flex gap-2 mb-12 2xl:mb-16'>
                            <motion.div
                                variants={inputVariants}
                                initial='hidden'
                                animate={animation}
                                transition={{ duration: 1, ease: 'easeInOut' }}
                                className='relative text-sm xl:text-base'
                            >
                                <LuUser2 className='text-pink-700 absolute bottom-3 left-4 xl:bottom-3.5' />
                                <input
                                    type='email'
                                    spellCheck={false}
                                    placeholder={t('pages.home.footer.email.input.placeholder')}
                                    className='caret-pink-700 text-pink-100 bg-[transparent] border border-pink-900 rounded-full px-4 py-2 pl-10 outline-none placeholder:text-pink-700 xl:pl-10 xl:w-80'
                                />
                            </motion.div>
                            <motion.button
                                variants={buttonVariants}
                                initial='hidden'
                                animate={animation}
                                transition={{ duration: 1, ease: 'easeInOut' }}
                                disabled
                                type='submit'
                                className='px-4 py-2 font-semibold text-purple-800 bg-pink-700 rounded-full disabled:bg-pink-700/50 disabled:cursor-not-allowed xl:px-6'
                            >
                                <Trans>{'global.label.soon'}</Trans>
                            </motion.button>
                        </div>
                        <motion.ul
                            initial='hidden'
                            animate={animation}
                            variants={iconContainer}
                            className='flex items-center gap-12 mb-8 text-pink-100 sm:gap-16 xl:gap-20 xl:mb-16'
                        >
                            <motion.li variants={iconVariants}>
                                <MagneticButton id='icon-discord'>
                                    <FaDiscord className='p-1.5 text-5xl transition-all duration-300 ease-in-out cursor-pointer hover:text-pink-700 3xl:text-6xl' />
                                </MagneticButton>
                            </motion.li>

                            <motion.li variants={iconVariants}>
                                <MagneticButton id='icon-github'>
                                    <FaGithub className='p-1.5 text-5xl transition-all duration-300 ease-in-out cursor-pointer hover:text-pink-700 3xl:text-6xl' />
                                </MagneticButton>
                            </motion.li>

                            <motion.li variants={iconVariants}>
                                <MagneticButton id='icon-twitter'>
                                    <FaXTwitter className='p-1.5 text-5xl transition-all duration-300 ease-in-out cursor-pointer hover:text-pink-700 3xl:text-6xl' />
                                </MagneticButton>
                            </motion.li>
                        </motion.ul>
                        <hr className='w-full mb-8 border-t border-purple-700 sm:mb-12 xl:mb-14' />
                        <div
                            className='flex flex-wrap items-center gap-4 text-sm font-semibold text-pink-900 sm:gap-12 xl:gap-24 2xl:text-base'
                        >
                            <a className='transition-all duration-300 ease-in-out cursor-pointer hover:text-pink-800'>
                                <Trans>{'pages.home.footer.links.about_us'}</Trans>
                            </a>
                            <a
                                href={URL_DISCORD}
                                target='_blank'
                                rel='noreferrer'
                                className='transition-all duration-300 ease-in-out cursor-pointer hover:text-pink-800'
                            >
                                <Trans>{'pages.home.footer.links.collaborate'}</Trans>
                            </a>
                            <a
                                href={URL_DISCORD}
                                target='_blank'
                                rel='noreferrer'
                                className='transition-all duration-300 ease-in-out cursor-pointer hover:text-pink-800'
                            >
                                <Trans>{'pages.home.footer.links.support'}</Trans>
                            </a>
                            <a className='transition-all duration-300 ease-in-out cursor-pointer hover:text-pink-800'>
                                <Trans>{'pages.home.footer.links.terms'}</Trans>
                            </a>
                            <a className='transition-all duration-300 ease-in-out cursor-pointer hover:text-pink-800'>
                                <Trans>{'pages.home.footer.links.privacy'}</Trans>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
