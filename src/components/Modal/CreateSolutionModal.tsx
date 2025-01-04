import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { FileUploader } from 'components/FileUploader';
import { Input } from 'components/shared/Input';
import { AuthContext } from 'contexts/AuthContext';
import { t } from 'i18next';
import { useCreateSolution } from 'services/solutions';
import { z } from 'zod';

import { Modal, ModalProps } from '.';

const createSolutionSchema = z.object({
    deployUrl: z
        .string()
        .min(1, t('pages.create_challenge.fields.title.error')),
    repositoryUrl: z
        .string({ message: t('pages.create_challenge.fields.description.error') })
        .trim()
        .min(1, t('pages.create_challenge.fields.description.error')),
});

type CreateSolutionSchema = z.infer<typeof createSolutionSchema>;

export const CreateSolutionModal = ({
    onConfirm,
    onCancel,
    ...rest
}: ModalProps) => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);
    const { id: challengeId } = useParams();

    const { mutate: createSolution } = useCreateSolution();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors: formErrors },
    } = useForm<CreateSolutionSchema>({
        resolver: zodResolver(createSolutionSchema),
    });

    const [cover, setCover] = useState<File | undefined>();

    const onSubmit: SubmitHandler<CreateSolutionSchema> = (formValues) => {
        const newSolution = {
            ...formValues,
            challengeId,
            image: cover,
            userId: user?.id,
        };
    
        createSolution(newSolution, {
            onSuccess: () => {
                onConfirm?.();
                reset();
            },
        });
    };

    return (
        <Modal
            className='flex flex-col gap-4'
            onConfirm={handleSubmit(onSubmit)}
            onCancel={() => {
                onCancel?.();
                reset();
            }}
            {...rest}
        >
            <Input
                {...register('deployUrl')}
                label={t('pages.challenge_users.solution.modal.fields.deploy')}
                error={formErrors.deployUrl?.message}
            />
            <Input
                {...register('repositoryUrl')}
                label={t('pages.challenge_users.solution.modal.fields.repository')}
                error={formErrors.repositoryUrl?.message}
            />
            <FileUploader
                label={t('pages.challenge_users.solution.modal.fields.image.insert')}
                onChange={setCover}
            />
        </Modal>
    )
};