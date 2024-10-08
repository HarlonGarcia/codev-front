import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Grid, GridItem } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import BackButton from 'components/shared/BackButton';
import { FloatInput } from 'components/shared/FloatInput';
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
          variant={'coolgrey'}
          label={t('pages.account.edit.fields.image.label')}
          className={'image-input'}
          register={register}
        />
        <Grid templateColumns='repeat(2, 1fr)' columnGap={6} rowGap={10}>
          <GridItem colSpan={1} >
            <FloatInput
              {...register('name')}
              label={t('pages.account.edit.fields.name.label')}
              error={formErrors.name?.message}
            />
          </GridItem>
          <GridItem colStart={2}>
            <FloatInput
              {...register('email')}
              label={t('pages.account.edit.fields.email.label')}
              error={formErrors.email?.message}
            />
          </GridItem>
          <GridItem colStart={1}>
            <FloatInput
              {...register('githubUrl')}
              label={t('pages.account.edit.fields.github.label')}
              error={formErrors.githubUrl?.message}
            />
          </GridItem>
          <GridItem colStart={2}>
            <FloatInput
              {...register('additionalUrl')}
              label={t('pages.account.edit.fields.additional.label')}
              error={formErrors.additionalUrl?.message}
            />
          </GridItem>
        </Grid>
        <button type='submit' disabled={!hasFormValuesChanged}>
          {t('pages.account.edit.button.submit.label')}
        </button>
      </S.FormWrapper>
    </S.Container>
  );
}
