import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from 'components/shared/Input';
import { AuthContext } from 'contexts/AuthContext';
import { FaArrowRightLong } from 'react-icons/fa6';

import * as S from './styles';
import { SignInSchema, signInSchema } from './validation';

export default function SignIn() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);

  const {
    formState: {
      dirtyFields,
      errors: formErrors,
    },
    reset: resetForm,
    register,
    handleSubmit,
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const hasFormValuesChanged = !(Object.keys(dirtyFields).length > 0);

  const onSubmit: SubmitHandler<SignInSchema> = (data) => {
    login(data, () => navigate('/'));
    resetForm(data);
  };

  if (isAuthenticated) {
    return <Navigate to={'/'} state={{ from: location }} replace />
  }
  return (
    <S.Container>
      <S.Header
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{t('pages.signin.title')}</h2>
        <p>{t('pages.signin.description')}</p>
      </S.Header>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email')}
          label={t('pages.signin.fields.email.label')}
          error={formErrors.email?.message}
          size='lg'
        />
        <Input
          {...register('password')}
          label={t('pages.signin.fields.password.label')}
          type='password'
          error={formErrors.password?.message}
          size='lg'
        />
        <Link to={'/signup'}>{
          t('pages.signin.no_account')
        }</Link>
        <S.SubmitButton
          type='submit'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          disabled={hasFormValuesChanged}
        >
          <span>{t('pages.signin.submit.label')}</span>
          <FaArrowRightLong />
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
}
