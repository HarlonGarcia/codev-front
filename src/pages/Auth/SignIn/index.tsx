import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Input } from '@components/shared/Input';
import { AuthContext } from '@contexts/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaArrowRightLong } from 'react-icons/fa6';

import * as S from './styles';
import { SignInSchema, signInSchema } from './validation';

const PASSWORD_MIN_LENGTH = 8;

export default function SignIn() {
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    formState: {
      errors: formErrors,
    },
    register,
    handleSubmit,
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInSchema> = (data) => {
    if (data.password.length < PASSWORD_MIN_LENGTH) {
      toast.error(t('pages.signin.alerts.invalid_credentials'));
      return;
    }

    login(data, {
      onSuccess: () => navigate('/'),
    })
  };

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
        >
          <span>{t('pages.signin.submit.label')}</span>
          <FaArrowRightLong />
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
}
