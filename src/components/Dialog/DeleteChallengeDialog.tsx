import { ReactNode } from 'react';

import { LuAlertTriangle } from "react-icons/lu";

import { Dialog, DialogProps } from '.';

interface DeleteChallengeDialogProps extends DialogProps {
    title: ReactNode;
    description: ReactNode;
    icon?: ReactNode;
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
                    <div className="flex items-center justify-center mx-auto text-red-500 rounded-full size-12 shrink-0 sm:mx-0 sm:size-10">
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
                        <p className="text-pink-100 codev-dialog-description text-md">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </Dialog>
    )
};