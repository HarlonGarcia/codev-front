import { ChangeEvent, useContext, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from 'components/shared/Input';
import { InputFile } from 'components/shared/InputFile';
import { Select } from 'components/shared/Select';
import { TextArea } from 'components/shared/TextArea';
import { AuthContext } from 'contexts/AuthContext';
import { t } from 'i18next';
import { MdOutlineClose } from 'react-icons/md';
import { useCategories } from 'services/category';
import { useCreateChallenge } from 'services/challenge';
import { useTechnologies } from 'services/technology';
import { ChallengeStatusEnum } from 'types/enums/challenge';

import { statuses } from '../utils';
import * as S from './styles';
import { CreateChallengeSchema, createChallengeSchema } from './validation';

interface ITechnologiesState {
  items: ITechnology[];
  error: string;
}

interface TechnologyListPros {
  technologies: ITechnology[];
  onRemove: (id: string) => void;
}

const TechnologiesList = ({ technologies, onRemove }: TechnologyListPros) => {
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
  const { logout, user: currentUser } = useContext(AuthContext);
  
  const [selectedTechnologies, setSelectedTechnologies] = useState<ITechnologiesState>({
    items: [],
    error: '',
  });
  
  const { data: categories = [] } = useCategories();
  const { data: technologies = [] } = useTechnologies();
  const { mutate: createChallenge } = useCreateChallenge();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<CreateChallengeSchema>({
    resolver: zodResolver(createChallengeSchema),
  });

  const onSubmit: SubmitHandler<CreateChallengeSchema> = (formValues) => {
    const { items, error } = selectedTechnologies;
  
    if (error) {
      return;
    }

    if (0 >= items.length) {
      setSelectedTechnologies((technologies) => ({
        ...technologies,
        error: t('pages.create_challenge.fields.technologies.error.min'),
      }));

      return;
    }

    if (!currentUser) {
      toast(t('pages.create_challenge.fields.author.error'));
      logout();
      return;
    }

    const file = formValues.image[0];
   
    const newChallenge = {
      ...formValues,
      image: file,
      technologies: items.map(({ id }) => id),
      authorId: currentUser.id,
      status: formValues.status as ChallengeStatusEnum,
    };

    createChallenge(newChallenge);
  };

  const addTechnology = (event: ChangeEvent<HTMLSelectElement>) => {
    if (5 <= selectedTechnologies.items.length) {
      toast(t('pages.create_challenge.fields.technologies.error.limit'));
      return;
    }

    const technologyId = event.target.value;
    const newTechnology = technologies.find(({ id }) => id === technologyId);

    if (!newTechnology) {
      return;
    }

    setSelectedTechnologies((prevState) => ({
      error: '',
      items: [ ...prevState.items, newTechnology ],
    }));
  };

  const removeChallenge = (id: string) => {
    setSelectedTechnologies((prevState) => ({
      ...prevState,
      items: prevState.items.filter((tech) => tech.id !== id),
    }));
  };

  const hydratedCategories = useMemo(() => {
    return categories.map(({ id, name }) => ({
      key: id,
      label: name,
      value: id,
    }));
  }, [categories]);

  const hydratedTechnologies = useMemo(() => {
    return technologies.map(({ id, name }) => ({
      key: id,
      label: name,
      value: id,
    }));
  }, [technologies]);

  return (
    <S.Container>
      <S.Form>
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
          technologies={selectedTechnologies.items}
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
            error={selectedTechnologies.error}
            options={hydratedTechnologies}
            size={'xl'}
            weight={'bold'}
          />
          <Select
            {...register('status')}
            label={t('pages.create_challenge.fields.status.label')}
            default={statuses[0]}
            error={formErrors.status?.message}
            options={statuses}
            size={'xl'}
            weight={'bold'}
          />
        </S.Group>
        <InputFile
          error={formErrors.image?.message as string}
          register={register}
        />
        <S.Submit
          type="submit"
          onClick={handleSubmit(onSubmit)}
          value={t('pages.create_challenge.submit.label')}
        />
      </S.Form>
    </S.Container>
  );
}