import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PiCircleDashedBold } from 'react-icons/pi';
import { useDispatch } from 'react-redux';

import * as Toggle from '@radix-ui/react-toggle';

import useForm from '../../../hooks/useForm';
import { AppDispatch } from '../../../store';
import { getCategories } from '../../../store/features/categorySlice';
import { createChallenge } from '../../../store/features/challengeSlice';
import { useSelector } from '../../../store/useSelector';
import { ChallengeDto } from '../../../types/Challenge';
import { ChallengeStatus as status } from '../../../types/enums/ChallengeStatus';
import * as S from './styles';

const defaultInputOptions = {
  spellCheck: false,
  autoComplete: 'off',
};

interface CreateChallengeForm {
  title: string;
  description: string;
  category: string;
}

const initialFormState: CreateChallengeForm = {
  title: '',
  description: '',
  category: '',
};

export default function CreateChallenge() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.challenges.create' });
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ challengeStatus, setChallengeStatus ] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state) => state.categories);

  const {
    formData,
    handleInputChange,
    changeFormPayload
  } = useForm<CreateChallengeForm>(initialFormState);

  const { title, description } = formData;

  const handleCategorySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    handleInputChange(event);
  };

  const handleCategoryValue = (categoryName: string) => {
    setSearchTerm(categoryName);
    changeFormPayload('category', categoryName);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const category = categories.find((category) => {
      return category.name.toLowerCase() === formData.category.toLowerCase();
    });

    const payload: ChallengeDto = {
      title,
      description,
      category,
      status: challengeStatus ? status.IN_PROGRESS : status.IN_PROGRESS,
    };

    dispatch(createChallenge(payload));
  };

  const handleStatusChange = () => {
    setChallengeStatus((prevState) => !prevState);
  };

  const getFilteredCategories = () => {
    return categories.filter(({ name }) => {
      const categoryName = name.toLowerCase();
      return categoryName.includes(searchTerm.toLowerCase()) && name !== searchTerm;
    });
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <S.InputGroup>
          <label>{t('title')}</label>
          <input
            id='title'
            type="text"
            value={title}
            onChange={handleInputChange}
            required
            {...defaultInputOptions}
          />
        </S.InputGroup>
        <S.InputGroup>
          <label>{t('description.label')}</label>
          <textarea
            id='description'
            value={description}
            onChange={handleInputChange}
            placeholder={t('description.placeholder')}
            required
            {...defaultInputOptions}
          />
        </S.InputGroup>
        <S.Group>
          <div>
            <label>{t('category')}</label>
            <input
              id='category'
              type="text"
              value={searchTerm}
              onChange={handleCategorySearch}
              {...defaultInputOptions}
            />
            <ul>
              {searchTerm.length > 0 && getFilteredCategories()
                .map(({ name }) => (
                  <li
                    key={name}
                    onClick={() => handleCategoryValue(name)}
                  >
                    {name}
                  </li>
                ))
              }
            </ul>
          </div>
          <div>
            <label>{t('status.label')}</label>
            <Toggle.Root
              className="toggle"
              data-state={challengeStatus ? 'off' : 'on'}
              onClick={handleStatusChange}
            >
              <PiCircleDashedBold />
              <small>{challengeStatus ? t('status.in_progress') : t('status.to_begin')}</small>
            </Toggle.Root>
          </div>
        </S.Group>
        <S.Submit
          type="submit"
          value={t('submit')}
        />
      </S.Form>
    </S.Container>
  );
}
