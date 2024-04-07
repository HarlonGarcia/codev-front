import { useEffect } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BiSolidLogInCircle } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { AppDispatch } from '../../../store';
import { signIn } from '../../../store/features/authSlice';
import { useSelector } from '../../../store/useSelector';
import * as S from './styles';

interface SignInForm {
  email: string;
  password: string;
}

export default function SignIn() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.signin' });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const authenticate = useSignIn();

  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
  } = useForm<SignInForm>();

  const onSubmit: SubmitHandler<SignInForm> = (payload) => {
    const hasUnfilledField = Object.values(payload)
      .every((value) => value.length <= 0);

    if (hasUnfilledField) {
      return;
    }

    dispatch(signIn({
      payload,
      saveAuthData: authenticate,
    }));
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    navigate('/');
  }, [ token, navigate ]);

  return (
    <S.Container>
      <S.Header
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
      </S.Header>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.InputGroup>
          <label htmlFor='email'>{t('form.email')}</label>
          <input
            {...register('email', { required: true })}
            type='email'
          />
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor='password'>{t('form.password')}</label>
          <input
            {...register('password', { required: true })}
            type='password'
          />
        </S.InputGroup>
        <Link to={'/signup'}>{t('signup')}</Link>
        <S.SubmitButton
          type='submit'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span>{t('form.login')}</span>
          <BiSolidLogInCircle />
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
}
