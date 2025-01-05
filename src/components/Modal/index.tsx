import { PropsWithChildren, ReactNode } from 'react';
import { Trans } from 'react-i18next';

import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export interface ModalProps {
    visible?: boolean;
    buttons?: ReactNode;
    className?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
};

export const Modal = ({
    visible = true,
    children,
    buttons,
    className,
    onConfirm,
    onCancel,
}: PropsWithChildren<ModalProps>) => {
    const classes = twMerge('px-4 pb-4 pt-5 sm:p-6 sm:pb-4',
        className,
    );

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className='relative z-10'
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 transition-opacity bg-purple-900/75'
                    >
                    </motion.div>
                    <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                        <div className='flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0'>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0, 0.71, 0.2, 1.01]
                                }}
                                className='relative overflow-hidden text-left transition-all transform bg-purple-700 rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg'
                            >
                                <div className={classes}>
                                    {children}
                                </div>
                                {buttons}
                                {!buttons && (
                                    <div className='px-4 py-3 bg-purple-600/50 sm:flex sm:flex-row-reverse sm:px-6'>
                                        <button
                                            onClick={onCancel}
                                            type='button'
                                            className='inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-pink-700 transition-all duration-300 ease-in-out rounded-md bg-purple-900/20 hover:bg-purple-900/50 sm:ml-3 sm:w-auto'
                                        >
                                            <Trans>
                                                {'global.label.cancel'}
                                            </Trans>
                                        </button>
                                        <button
                                            onClick={onConfirm}
                                            type='button'
                                            className='inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-pink-700 transition-all duration-300 ease-in-out rounded-md bg-purple-900/20 hover:bg-purple-900/50 hover:text-green-800 sm:mt-0 sm:w-auto'
                                        >
                                            <Trans>
                                                {'global.label.yes'}
                                            </Trans>
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
};