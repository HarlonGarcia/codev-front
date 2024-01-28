import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PiCircleDashedBold } from 'react-icons/pi';
import { useDispatch } from 'react-redux';

import { zodResolver } from '@hookform/resolvers/zod';
import * as Toggle from '@radix-ui/react-toggle';

import { Input } from '../../../components/shared/Input';
import { AppDispatch } from '../../../store';
import { getCategories } from '../../../store/slices/category';
import { createChallenge } from '../../../store/slices/challenge';
import { useSelector } from '../../../store/useSelector';
import { IChallengeDto } from '../../../types/Challenge';
import {
  IChallengeStatus as status,
} from '../../../types/enums/ChallengeStatus';
import * as S from './styles';
import { CreateChallengeSchema, createChallengeSchema } from './validation';

export default function CreateChallenge() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [ challengeStatus, setChallengeStatus ] = useState(false);

  const { items: categories } = useSelector((state) => state.categories);

  const {
    formState: {
      errors: formErrors,
    },
    register,
    handleSubmit,
  } = useForm<CreateChallengeSchema>({
    resolver: zodResolver(createChallengeSchema),
  });

  const onSubmit: SubmitHandler<CreateChallengeSchema> = (formValues) => {
    const category = categories.find((category) => {
      return category.name.toLowerCase() === formValues.category.toLowerCase();
    });

    const payload: IChallengeDto = {
      ...formValues,
      category,
      status: challengeStatus ? status.IN_PROGRESS : status.IN_PROGRESS,
    };

    dispatch(createChallenge(payload));
  };

  const handleStatusChange = () => {
    setChallengeStatus((prevState) => !prevState);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('title')}
          label={t('pages.create_challenge.fields.title.label')}
          error={formErrors.title?.message}
        />
        <S.InputGroup>
          <label>{t('pages.create_challenge.fields.description.label')}</label>
          <textarea
            {...register('description')}
            placeholder={
              t('pages.create_challenge.fields.description.placeholder')
            }
          />
        </S.InputGroup>
        <S.Group>
          <Input
            {...register('category')}
            label={t('pages.create_challenge.fields.category.label')}
            error={formErrors.category?.message}
          />
          <div>
            <label>{t('pages.create_challenge.fields.status.label')}</label>
            <Toggle.Root
              className="toggle"
              data-state={challengeStatus ? 'off' : 'on'}
              onClick={handleStatusChange}
            >
              <PiCircleDashedBold />
              <small>
                {
                  challengeStatus
                    ? t('global.challenges.status.in_progress')
                    : t('global.challenges.status.to_begin')
                }
              </small>
            </Toggle.Root>
          </div>
        </S.Group>
        <S.Submit
          type="submit"
          value={t('pages.create_challenge.submit.label')}
        />
      </S.Form>
    </S.Container>
  );
}
