import { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { FaArrowRightLong } from 'react-icons/fa6';

import * as S from './styles';
import { AppDispatch } from '../../../store';
import useForm from '../../../hooks/useForm';
import { signUp } from '../../../store/features/authSlice';
import { toast } from 'react-toastify';
import { useCustomSelector } from '../../../store/useCustomSelector';
import { useSignIn } from 'react-auth-kit';
import { EXPIRES_IN } from '../../../utils/constants';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  githubUrl: string;
  additionalUrl?: string;
}

const initialFormState: SignUpForm = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  githubUrl: '',
  additionalUrl: '',
};

export default function SignUp() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.signup' });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const authenticate = useSignIn();

  const { token, isError } = useCustomSelector((state) => state.auth);
  const {
    formData,
    handleInputChange,
  } = useForm<SignUpForm>(initialFormState);

  const handleSignUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { password, passwordConfirmation, githubUrl } = formData;
    const regex = /\bgithub.com\b/;
    const isGithubUrlValid = regex.test(githubUrl);
  
    if (password !== passwordConfirmation) {
      toast.error(t('alert.password'));
      return;
    }

    if (!isGithubUrlValid) {
      toast.error(t('alert.github'));
      return;
    }

    const userPayload = {
      ...formData,
      passwordConfirmation: undefined,
    };

    dispatch(signUp(userPayload));
  };

  const saveAuthToken = () => {
    const authConfig = {
      token,
      expiresIn: EXPIRES_IN,
      tokenType: 'Bearer',
      authState: { token },
    };

    if (isError) {
      toast.error(t('alert.error'));
      return;
    }

    if(!!token && authenticate(authConfig)){
      localStorage.setItem('_credentials', JSON.stringify(token));
      navigate('/');
      return;
    }
  };

  useEffect(() => {
    saveAuthToken();
  }, [ token, isError ]);

  const defaultInputProps = {
    onChange: handleInputChange,
    required: true,
    autoComplete: 'off',
  };

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
      <S.Form onSubmit={handleSignUp}>
        <S.Field>
          <label htmlFor="name">{t('form.fields.name.label')}</label>
          <input
            {...defaultInputProps}
            id='name'
            type="text"
            name="name"
            value={formData.name}
            placeholder={t('form.fields.name.placeholder')}
          />
        </S.Field>

        <S.Field>
          <label htmlFor="email">{t('form.fields.email.label')}</label>
          <input
            {...defaultInputProps}
            id='email'
            type="email"
            name="email"
            value={formData.email}
            placeholder={t('form.fields.email.placeholder')}
          />
        </S.Field>

        <S.Field>
          <label htmlFor="password">{t('form.fields.password.label')}</label>
          <input
            {...defaultInputProps}
            id='password'
            type="password"
            name="password"
            value={formData.password}
            placeholder={t('form.fields.password.placeholder')}
            minLength={6}
          />
        </S.Field>

        <S.Field>
          <label htmlFor="passwordConfirmation">{t('form.fields.confirmationPassword.label')}</label>
          <input
            {...defaultInputProps}
            id='passwordConfirmation'
            type="password"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            placeholder={t('form.fields.confirmationPassword.placeholder')}
          />
        </S.Field>

        <S.Field>
          <label htmlFor="githubUrl">{t('form.fields.githubUrl.label')}</label>
          <input
            {...defaultInputProps}
            id='githubUrl'
            type="text"
            name="githubUrl"
            value={formData.githubUrl}
            placeholder={t('form.fields.githubUrl.placeholder')}
          />
        </S.Field>

        <S.Field>
          <label htmlFor="additionalUrl">{t('form.fields.additionalUrl.label')}</label>
          <input
            {...defaultInputProps}
            id='additionalUrl'
            type="text"
            name="additionalUrl"
            value={formData.additionalUrl}
            placeholder={t('form.fields.additionalUrl.placeholder')}
            required={false}
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