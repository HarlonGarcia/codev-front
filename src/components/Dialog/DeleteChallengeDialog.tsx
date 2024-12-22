import { ReactNode } from 'react';

import { LuAlertTriangle } from "react-icons/lu";

import { Dialog, DialogProps } from '.';

interface DeleteChallengeDialogProps extends DialogProps {
    title: ReactNode;
    description: ReactNode;
};

export const DeleteChallengeDialog = ({
    title,
    description,
    icon,
    ...rest
}: DeleteChallengeDialogProps) => {
    return (
        <Dialog
            {...rest}
        >
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
        </Dialog>
    )
};