import { useEffect } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../../../components/shared/Input';
import { AppDispatch } from '../../../store';
import { signUp } from '../../../store/features/authSlice';
import { useSelector } from '../../../store/useSelector';
import * as S from './styles';
import { SignUpSchema, signUpSchema } from './validation';

export default function SignUp() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.signup' });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const authenticate = useSignIn();

  const { token } = useSelector((state) => state.auth);

  const {
    formState: {
      errors: formErrors,
    },
    register,
    handleSubmit,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    const payload = {
      ...data,
      additionalUrl: data.additionalUrl || undefined,
      passwordConfirmation: undefined,
    };

    dispatch(signUp({
      payload,
      saveAuthData: authenticate,
    }));
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    navigate('/');
  }, [ navigate, token ]);

  return (
    <S.Container>
      <S.Header
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{t('form.title')}</h2>
        <p>{t('form.description')}</p>
      </S.Header>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('name')}
          label={t('form.fields.name.label')}
          placeholder={t('form.fields.name.placeholder')}
          type='text'
          error={formErrors.name?.message}
        />
        <Input
          {...register('email')}
          label={t('form.fields.email.label')}
          placeholder={t('form.fields.email.placeholder')}
          error={formErrors.email?.message}
        />
        <Input
          {...register('password')}
          label={t('form.fields.password.label')}
          placeholder={t('form.fields.password.placeholder')}
          type='password'
          error={formErrors.password?.message}
        />
        <Input
          {...register('passwordConfirmation')}
          label={t('form.fields.confirmationPassword.label')}
          placeholder={t('form.fields.confirmationPassword.placeholder')}
          type='password'
          error={formErrors.passwordConfirmation?.message}
        />
        <Input
          {...register('githubUrl')}
          label={t('form.fields.githubUrl.label')}
          placeholder={t('form.fields.githubUrl.placeholder')}
          type='text'
          error={formErrors.githubUrl?.message}
        />
        <Input
          {...register('additionalUrl')}
          label={t('form.fields.additionalUrl.label')}
          placeholder={t('form.fields.additionalUrl.placeholder')}
          type='text'
          error={formErrors.additionalUrl?.message}
        />
        <S.SubmitButton
          type='submit'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span>{t('form.submit')}</span>
          <FaArrowRightLong />
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
}