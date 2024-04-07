import { useEffect } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AppDispatch } from '../../../store';
import { signUp } from '../../../store/features/authSlice';
import { useSelector } from '../../../store/useSelector';
import * as S from './styles';
import { validate } from './validation';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  githubUrl: string;
  additionalUrl?: string;
}

export default function SignUp() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.signup' });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const authenticate = useSignIn();

  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
  } = useForm<SignUpForm>();

  const onSubmit: SubmitHandler<SignUpForm> = (data) => {
    const { password, passwordConfirmation, additionalUrl } = data;

    if (password !== passwordConfirmation) {
      toast.error(t('alert.password'));
      return;
    }

    const payload = {
      ...data,
      additionalUrl: additionalUrl || undefined,
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
        <S.Field>
          <label htmlFor="name">{t('form.fields.name.label')}</label>
          <input
            type="text"
            placeholder={t('form.fields.name.placeholder')}
            autoComplete='off'
            {...register('name', { required: true })}
          />
        </S.Field>

        <S.Field>
          <label htmlFor="email">{t('form.fields.email.label')}</label>
          <input
            type="email"
            placeholder={t('form.fields.email.placeholder')}
            {...register('email', { required: true })}
          />
        </S.Field>

        <S.Field>
          <label htmlFor="password">{t('form.fields.password.label')}</label>
          <input
            type="password"
            placeholder={t('form.fields.password.placeholder')}
            autoComplete='off'
            {...register('password', { required: true, minLength: 6 })}
          />
        </S.Field>

        <S.Field>
          <label htmlFor="passwordConfirmation">
            {t('form.fields.confirmationPassword.label')}
          </label>
          <input
            type="password"
            placeholder={t('form.fields.confirmationPassword.placeholder')}
            autoComplete='off'
            {...register('passwordConfirmation', { required: true })}
          />
        </S.Field>

        <S.Field>
          <label htmlFor="githubUrl">{t('form.fields.githubUrl.label')}</label>
          <input
            type="text"
            placeholder={t('form.fields.githubUrl.placeholder')}
            autoComplete='off'
            {...register('githubUrl', {
              required: true,
              validate: (value) => validate.github(value),
            })}
          />
        </S.Field>

        <S.Field>
          <label htmlFor="additionalUrl">
            {t('form.fields.additionalUrl.label')}
          </label>
          <input
            {...register('additionalUrl')}
            type="text"
            placeholder={t('form.fields.additionalUrl.placeholder')}
            autoComplete='off'
          />
        </S.Field>
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