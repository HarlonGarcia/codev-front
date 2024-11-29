import { ReactNode } from 'react';
import { Trans } from 'react-i18next';

import { LuAlertTriangle } from "react-icons/lu";
import { twMerge } from 'tailwind-merge';

interface DialogProps {
    visible?: boolean;
    title: ReactNode;
    description: ReactNode;
    buttons?: boolean;
    icon?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
};

export const Dialog = ({
    visible = true,
    title,
    description,
    buttons = true,
    icon = true,
    onConfirm,
    onCancel,
}: DialogProps) => {
    const withoutButtonsStyle = twMerge('px-4 pb-4 pt-5 sm:p-6 sm:pb-4',
        buttons ? '' : 'p-4 sm:pb-6',
    );

    if (!visible) {
        return null;
    }
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-purple-900/75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-purple-700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className={withoutButtonsStyle}>
                            <div className="sm:flex sm:items-start">
                                {icon && (
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full text-red-500 sm:mx-0 sm:size-10">
                                        <LuAlertTriangle size={30} />
                                    </div>
                                )}
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3
                                        className="text-base font-semibold text-pink-700"
                                        id="modal-title"
                                    >
                                        {title}
                                    </h3>
                                    <div className="mt-2">
                                        <p className="codev-dialog-description text-md text-pink-100">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {buttons && (
                            <div className="bg-purple-600/50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    onClick={onCancel}
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-pink-700 bg-purple-900/20 transition-all duration-300 ease-in-out hover:bg-purple-900/50 sm:ml-3 sm:w-auto"
                                >
                                    <Trans>
                                        {'global.label.cancel'}
                                    </Trans>
                                </button>
                                <button
                                    onClick={onConfirm}
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-pink-700 bg-purple-900/20 transition-all duration-300 ease-in-out hover:bg-purple-900/50 hover:text-red-500 sm:mt-0 sm:w-auto"
                                >
                                    <Trans>
                                        {'global.label.yes'}
                                    </Trans>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};