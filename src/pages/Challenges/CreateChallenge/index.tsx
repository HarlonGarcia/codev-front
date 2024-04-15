import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { t } from 'i18next';

import { Input } from '../../../components/shared/Input';
import { Select } from '../../../components/shared/Select';
import { TextArea } from '../../../components/shared/TextArea';
import { usePermissions } from '../../../hooks/usePermissions';
import { AppDispatch } from '../../../store';
import { getCategories } from '../../../store/slices/category';
import { createChallenge } from '../../../store/slices/challenge';
import { getTechnologies } from '../../../store/slices/technology';
import { useSelector } from '../../../store/useSelector';
import { IChallengeStatus } from '../../../types/enums/ChallengeStatus';
import { ITechnology } from '../../../types/Technology';
import { statuses } from '../utils';
import * as S from './styles';
import { CreateChallengeSchema, createChallengeSchema } from './validation';

interface ITechnologiesState {
  items: ITechnology[];
  error: string;
}

const TechnologiesList = (
  // eslint-disable-next-line no-unused-vars
  props: { technologies: ITechnology[], onRemove: (id: string) => void }) => {
  const { technologies, onRemove } = props;

  if (0 < technologies.length) {
    return (
      <S.SelectedTechnologies>
        <strong>
          {t('pages.create_challenge.fields.selected_technologies.label')}
        </strong>
        <S.Technology>
          {technologies.map(({ id, name, color }) => (
            <li key={id}>
              <span style={{ color }}>{name}</span>
              <button onClick={() => onRemove(id)}>
                <MdOutlineClose />
              </button>
            </li>
          ))}
        </S.Technology>
      </S.SelectedTechnologies>
    );
  }
  return <></>;
};

export default function CreateChallenge() {
  const { t } = useTranslation();
  const { logout } = usePermissions();
  const { currentUser: user } = useSelector((state) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const [
    technologiesState,
    setTechnologiesState,
  ] = useState<ITechnologiesState>({ items: [], error: '' });

  const { items: categories } = useSelector((state) => state.categories);
  const { items: technologies } = useSelector((state) => state.technologies);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<CreateChallengeSchema>({
    resolver: zodResolver(createChallengeSchema),
  });

  const onSubmit: SubmitHandler<CreateChallengeSchema> = (formValues) => {
    const { items: selectedTechnologies, error } = technologiesState;

    if (Boolean(error)) {
      return;
    }

    if (0 >= selectedTechnologies.length) {
      setTechnologiesState((prevState) => ({
        ...prevState,
        error: t('pages.create_challenge.fields.technologies.error.min'),
      }));
      return;
    }

    if (!user) {
      toast(t('pages.create_challenge.fields.author.error'));
      logout();
      return;
    }

    const newChallenge = {
      ...formValues,
      imageUrl: 'test',
      technologies: selectedTechnologies.map(({ id }) => id),
      authorId: user.id,
      status: formValues.status as IChallengeStatus,
    };

    dispatch(createChallenge(newChallenge));
  };

  const addTechnology = (event: ChangeEvent<HTMLSelectElement>) => {
    if (5 <= technologiesState.items.length) {
      toast(t('pages.create_challenge.fields.technologies.error.limit'));
      return;
    }

    const technologyId = event.target.value;
    const newTechnology = technologies.find((tech) => tech.id === technologyId);

    if (!newTechnology) {
      return;
    }

    setTechnologiesState((prevState) => ({
      error: '',
      items: [ ...prevState.items, newTechnology ],
    }));
  };

  const removeChallenge = (id: string) => {
    setTechnologiesState((prevState) => ({
      ...prevState,
      items: prevState.items.filter((tech) => tech.id !== id),
    }));
  };

  const hydratedCategories = useMemo(() => {
    return categories.map((category) => ({
      key: category.id,
      label: category.name,
      value: category.id,
    }));
  }, [categories]);

  const hydratedTechnologies = useMemo(() => {
    return technologies.map((technology) => ({
      key: technology.id,
      label: technology.name,
      value: technology.id,
    }));
  }, [technologies]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getTechnologies());
  }, [dispatch]);

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('title')}
          label={t('pages.create_challenge.fields.title.label')}
          error={formErrors.title?.message}
          size={'xl'}
          weight={'bold'}
        />
        <TextArea
          {...register('description')}
          label={t('pages.create_challenge.fields.description.label')}
          placeholder={
            t('pages.create_challenge.fields.description.placeholder')
          }
          error={formErrors.description?.message}
          size={'xl'}
          weight={'bold'}
        />
        <TechnologiesList
          technologies={technologiesState.items}
          onRemove={removeChallenge}
        />
        <S.Group>
          <Select
            {...register('categoryId')}
            label={t('pages.create_challenge.fields.category.label')}
            error={formErrors.categoryId?.message}
            options={hydratedCategories}
            size={'xl'}
            weight={'bold'}
          />
          <Select
            id='technologies'
            name='technologies'
            onChange={addTechnology}
            label={t('pages.create_challenge.fields.technologies.label')}
            error={technologiesState.error}
            options={hydratedTechnologies}
            size={'xl'}
            weight={'bold'}
          />
          <Select
            {...register('status')}
            label={t('pages.create_challenge.fields.status.label')}
            error={formErrors.status?.message}
            options={statuses}
            size={'xl'}
            weight={'bold'}
          />
        </S.Group>
        <S.Submit
          type="submit"
          value={t('pages.create_challenge.submit.label')}
        />
      </S.Form>
    </S.Container>
  );
}