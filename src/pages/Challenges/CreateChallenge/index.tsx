import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Toggle from '@radix-ui/react-toggle';
import { PiCircleDashedBold } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';

import * as S from './styles';
import useChallengeForm from '../../../hooks/useChallengeForm';
import { useCustomSelector } from '../../../store/useCustomSelector';
import { AppDispatch } from '../../../store';
import { getAllCategories } from '../../../store/features/categorySlice';
import { createChallenge } from '../../../store/features/challengeSlice';

const defaultInputOptions = {
  spellCheck: false,
  autoComplete: 'off',
};

export default function CreateChallenge() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.challenges.create' });
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ challengeStatus, setChallengeStatus ] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useCustomSelector((state) => state.categories);

  const {
    formData,
    handleInputChange,
    changeFormPayload
  } = useChallengeForm();

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

    const payload = {
      title,
      description,
      categoryId: category?.id,
      authorId: '',
      status: challengeStatus ? 'IN_PROGRESS' : 'TO_BEGIN',
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
    dispatch(getAllCategories());
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
