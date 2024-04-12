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
import { signUp } from '../../../store/slices/auth';
import { getMe } from '../../../store/slices/user';
import { useSelector } from '../../../store/useSelector';
import * as S from './styles';
import { SignUpSchema, signUpSchema } from './validation';

export default function SignUp() {
  const { t } = useTranslation();

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

  const onSubmit: SubmitHandler<SignUpSchema> = (formValues) => {
    const payload = {
      ...formValues,
      additionalUrl: formValues.additionalUrl || undefined,
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

    dispatch(getMe());
    navigate('/');
  }, [ dispatch, navigate, token ]);

  return (
    <S.Container>
      <S.Header
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{t('pages.signup.title')}</h2>
        <p>{t('pages.signup.description')}</p>
      </S.Header>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('name')}
          label={t('pages.signup.fields.name.label')}
          placeholder={t('pages.signup.fields.name.placeholder')}
          type='text'
          error={formErrors.name?.message}
        />
        <Input
          {...register('email')}
          label={t('pages.signup.fields.email.label')}
          placeholder={t('pages.signup.fields.email.placeholder')}
          error={formErrors.email?.message}
        />
        <Input
          {...register('password')}
          label={t('pages.signup.fields.password.label')}
          placeholder={t('pages.signup.fields.password.placeholder')}
          type='password'
          error={formErrors.password?.message}
        />
        <Input
          {...register('passwordConfirmation')}
          label={t('pages.signup.fields.confirmation_password.label')}
          placeholder={
            t('pages.signup.fields.confirmation_password.placeholder')
          }
          type='password'
          error={formErrors.passwordConfirmation?.message}
        />
        <Input
          {...register('githubUrl')}
          label={t('pages.signup.fields.github.label')}
          placeholder={t('pages.signup.fields.github.placeholder')}
          type='text'
          error={formErrors.githubUrl?.message}
        />
        <Input
          {...register('additionalUrl')}
          label={t('pages.signup.fields.additional.label')}
          placeholder={t('pages.signup.fields.additional.placeholder')}
          type='text'
          error={formErrors.additionalUrl?.message}
        />
        <S.SubmitButton
          type='submit'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span>{t('pages.signup.submit.label')}</span>
          <FaArrowRightLong />
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
}