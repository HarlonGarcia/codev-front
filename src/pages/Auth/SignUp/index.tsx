import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from 'components/shared/Input';
import { AuthContext } from 'contexts/AuthContext';
import { FaArrowRightLong } from 'react-icons/fa6';
import { uuid } from 'uuidv4';

import * as S from './styles';
import { SignUpSchema, signUpSchema } from './validation';

export default function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUp } = useContext(AuthContext);

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
    const newUser = {
      ...formValues,
      id: uuid(),
      additionalUrl: formValues.additionalUrl || undefined,
      passwordConfirmation: undefined,
    };

    signUp(newUser, () => navigate('/'))
  };

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
          size='lg'
        />
        <Input
          {...register('email')}
          label={t('pages.signup.fields.email.label')}
          placeholder={t('pages.signup.fields.email.placeholder')}
          error={formErrors.email?.message}
          size='lg'
        />
        <Input
          {...register('password')}
          label={t('pages.signup.fields.password.label')}
          placeholder={t('pages.signup.fields.password.placeholder')}
          type='password'
          error={formErrors.password?.message}
          size='lg'
        />
        <Input
          {...register('passwordConfirmation')}
          label={t('pages.signup.fields.confirmation_password.label')}
          placeholder={
            t('pages.signup.fields.confirmation_password.placeholder')
          }
          type='password'
          error={formErrors.passwordConfirmation?.message}
          size='lg'
        />
        <Input
          {...register('githubUrl')}
          label={t('pages.signup.fields.github.label')}
          placeholder={t('pages.signup.fields.github.placeholder')}
          type='text'
          error={formErrors.githubUrl?.message}
          size='lg'
        />
        <Input
          {...register('additionalUrl')}
          label={t('pages.signup.fields.additional.label')}
          placeholder={t('pages.signup.fields.additional.placeholder')}
          type='text'
          error={formErrors.additionalUrl?.message}
          size='lg'
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