import { ChangeEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Select } from 'components/Select';
import { Loader } from 'components/shared/Loader';
import { challengesOrderBy } from 'enums/challengeOrderBy';
import { challengeStatuses } from 'enums/challengeStatus';
import { FaArrowUpAZ, FaArrowDownAZ } from "react-icons/fa6";
import { IoMdList } from "react-icons/io";
import { MdGridView } from "react-icons/md";
import { useCategories } from 'services/category';
import { useChallenges } from 'services/challenge';
import { IGetChallengeParams } from 'services/challenge/types';
import { useTechnologies } from 'services/technology';
import { ChallengeStatusEnum } from 'types';

import * as S from './styles';

interface Filters {
  technology?: string;
  category?: string;
  status?: ChallengeStatusEnum;
  orderBy?: IGetChallengeParams['orderBy'];
}

export default function Challenges() {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<Filters>({});
  const [isAscOrder, setIsAscOrder] = useState(false);
  const [isGrid, setIsGrid] = useState(false);

  const {
    data: challenges = [],
    isFetching: isChallengesLoading,
  } = useChallenges({
    ...filters,
    order: isAscOrder ? 'asc' : 'desc',
  });

  const {
    data: categoriesItems = [],
    isFetching: isCategoriesLoading,
  } = useCategories();

  const {
    data: technologiesItems = [],
    isFetching: isTechnologiesLoading,
  } = useTechnologies();

  const isLoading = isChallengesLoading || isCategoriesLoading || isTechnologiesLoading;

  const toggleAlphabeticalOrder = () => {
    setIsAscOrder((prevState) => !prevState);
  };

  const handleFilterChange = (key: string) => (event: ChangeEvent<HTMLSelectElement>) => {
    setFilters((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }))
  };

  const getFilterProps = (id: keyof Filters) => ({
    id,
    value: filters[id],
    onChange: handleFilterChange(id),
  })

  const categories = useMemo(() => {
    return categoriesItems.map(({ id, name }) => ({
      key: id,
      value: id,
      label: name,
    }))
  }, [categoriesItems]);

  const technologies = useMemo(() => {
    return technologiesItems.map(({ id, name }) => ({
      key: id,
      value: id,
      label: name,
    }))
  }, [technologiesItems]);

  const statuses = useMemo(() => {
    return Object.values(challengeStatuses).map(({ id, label }) => ({
      key: id,
      value: id,
      label,
    }))
  }, []);
  
  return (
    <>
      <Loader loading={isLoading} />
      <S.Container>
        <S.Header>
          <h1>Desafios</h1>
          <p>{t('pages.dashboard.stats.description')}</p>
        </S.Header>
        <S.ChallengesContainer>
          <S.ChallengesHeader>
            <S.Filters>
              <Select
                {...getFilterProps('category')}
                placeholder={'Select a category'}
                options={categories}
              />
              <Select
                {...getFilterProps('technology')}
                placeholder={'Select a technology'}
                options={technologies}
              />
              <Select
                {...getFilterProps('status')}
                placeholder={'Select a status'}
                options={statuses}
              />
              <Select
                {...getFilterProps('orderBy')}
                placeholder={'Select a order'}
                options={Object.values(challengesOrderBy)}
              />
            </S.Filters>
            <S.Actions>
              <S.Order onClick={toggleAlphabeticalOrder}>
                {isAscOrder ? <FaArrowUpAZ /> : <FaArrowDownAZ />}
              </S.Order>
              <S.Toggle active={isGrid ? 'grid' : 'list'}>
                <button onClick={() => setIsGrid(false)}>
                  <IoMdList />
                </button>
                <button onClick={() => setIsGrid(true)}>
                  <MdGridView />
                </button>
              </S.Toggle>
            </S.Actions>
          </S.ChallengesHeader>
          {isGrid ? (
            <S.List>
              {challenges.map(({ id, title }) => (
                <S.ListItem key={id}>
                  <h2>{title}</h2>
                </S.ListItem>
              ))}
            </S.List>
          ) : (
            <S.List>
              {challenges.map(({ id, title }) => (
                <S.ListItem key={id}>
                  <h2>{title}</h2>
                </S.ListItem>
              ))}
            </S.List>
          )}
        </S.ChallengesContainer>
      </S.Container>
    </>
  );
}
