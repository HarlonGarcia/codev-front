import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import BackButton from 'components/shared/BackButton';
import { Input } from 'components/shared/Input';
import { InputFile } from 'components/shared/InputFile';
import { AuthContext } from 'contexts/AuthContext';
import { useUpdateUser } from 'services/user';
import { getBase64Image } from 'utils';

import * as S from './styles';
import { modifyUserSchema, ModifyUserSchema } from './validation';

export default function ModifyUser() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { user, invalidateUser } = useContext(AuthContext);
    const { mutate: updateUser } = useUpdateUser();

    const {
        formState: {
            dirtyFields,
            errors: formErrors,
        },
        reset: resetForm,
        setValue,
        register,
        handleSubmit,
    } = useForm<ModifyUserSchema>({
        resolver: zodResolver(modifyUserSchema),
    });

    const hasFormValuesChanged = Object.keys(dirtyFields).length > 0;

    const onSubmit: SubmitHandler<ModifyUserSchema> = (newValues) => {
        if (!user) {
            return;
        }

        const image = newValues.image?.[0];

        const updateOptions = {
            onSuccess: () => {
                toast.success(t('pages.account.edit.button.submit.success'));
                resetForm(newValues);
                invalidateUser();
                navigate('/account');
            },
        };

        const newUser = {
            ...newValues,
            image,
        }
  
        updateUser({
            identifier: user.id,
            user,
            newUser,
        }, updateOptions)
    };

    const handleImageChange = () => {
        setValue('image', {}, { shouldTouch: true });
    };

    useEffect(function setInitialValues() {
        if (!user) {
            return;
        }

        resetForm(user)
    }, []);

    return (
        <S.Container>
            <S.Header>
                <BackButton path={'/account'} />
                <h2>{t('pages.account.edit.title')}</h2>
            </S.Header>
            <S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
                <InputFile
                    showCloseButton
                    onChange={handleImageChange}
                    image={getBase64Image(user?.image?.file)}
                    variant={'green'}
                    label={t('pages.account.edit.fields.image.label')}
                    className={'image-input'}
                    register={register}
                />
                <div className='grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-8'>
                    <div>
                        <Input
                            {...register('name')}
                            label={t('pages.account.edit.fields.name.label')}
                            error={formErrors.name?.message}
                        />
                    </div>
                    <div>
                        <Input
                            {...register('email')}
                            label={t('pages.account.edit.fields.email.label')}
                            error={formErrors.email?.message}
                        />
                    </div>
                    <div>
                        <Input
                            {...register('githubUrl')}
                            label={t('pages.account.edit.fields.github.label')}
                            error={formErrors.githubUrl?.message}
                        />
                    </div>
                    <div>
                        <Input
                            {...register('additionalUrl')}
                            label={t('pages.account.edit.fields.additional.label')}
                            error={formErrors.additionalUrl?.message}
                        />
                    </div>
                </div>
                <button
                    className='w-fit py-2 px-4 bg-purple-800 text-green-800  rounded transition-all duration-300 ease-in-out hover:bg-purple-800/90 hover:text-green-900 disabled:cursor-not-allowed disabled:bg-purple-800/50 disabled:text-green-900/70 md:py-3 md:px-6'
                    type='submit'
                    disabled={!hasFormValuesChanged}
                >
                    {t('pages.account.edit.button.submit.label')}
                </button>
            </S.FormWrapper>
        </S.Container>
    );
}
