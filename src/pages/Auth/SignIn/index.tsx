import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { BiSolidLogInCircle } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

import * as S from './styles';
import { EXPIRES_IN } from '../../../utils/constants';
import { AppDispatch } from '../../../store';
import { useCustomSelector } from '../../../store/useCustomSelector';
import { signIn } from '../../../store/features/authSlice';
import useForm from '../../../hooks/useForm';

interface SignInForm {
  email: string;
  password: string;
}

const initialFormState: SignInForm = {
  email: '',
  password: '',
};

export default function SignIn() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.signin' });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const authenticate = useSignIn();

  const {
    formData,
    handleInputChange
  } = useForm<SignInForm>(initialFormState);

  const auth = useCustomSelector((state) => state.auth);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    dispatch(signIn({
      username: formData.email,
      password: formData.password,
    }));
  };

  const handleAuthResponse = () => {
    const authResponse = {
      token: auth.token,
      expiresIn: EXPIRES_IN,
      tokenType: 'Bearer',
      authState: {
        token: auth.token,
      }
    };

    if (auth.isError) {
      toast.error(t('alert.invalid'));
      return;
    }

    if(!!auth.token && authenticate(authResponse)){
      localStorage.setItem('_credentials', JSON.stringify(auth.token));
      navigate('/');
      return;
    }
  };

  useEffect(() => {
    handleAuthResponse();
  }, [ auth.token, auth.isError ]);

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
      <S.Form onSubmit={handleSubmit}>
        <S.InputGroup>
          <label htmlFor="email">{t('form.email')}</label>
          <input
            id='email'
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete='off'
            required
          />
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="password">{t('form.password')}</label>
          <input
            id='password'
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete='off'
            required
          />
        </S.InputGroup>
        <Link to={'/signup'}>{t('signup')}</Link>
        <S.SubmitButton
          type="submit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span>
            {t('form.login')}
          </span>
          <BiSolidLogInCircle />
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
}