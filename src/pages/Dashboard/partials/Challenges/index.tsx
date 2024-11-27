import { ChangeEvent, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Select } from 'components/Select';
import { Loader } from 'components/shared/Loader';
import { AuthContext } from 'contexts/AuthContext';
import { challengesOrderBy } from 'enums/challengeOrderBy';
import { challengeStatuses } from 'enums/challengeStatus';
import { FaArrowUpAZ, FaArrowDownAZ } from "react-icons/fa6";
import { GrStatusGoodSmall } from "react-icons/gr";
import { IoMdList, IoMdTrash } from "react-icons/io";
import { MdEdit, MdGridView } from "react-icons/md";
import { useCategories } from 'services/category';
import { useChallenges, useDeleteChallenge } from 'services/challenge';
import { IGetChallengeParams } from 'services/challenge/types';
import { useTechnologies } from 'services/technology';
import { ChallengeStatusEnum } from 'types';
import { getBase64Image } from 'utils';
import { NONE } from 'utils/constants';

import imagePlaceholder from '../../../../../public/images/card-image-placeholder-2.png'
import * as S from './styles';

interface Filters {
    technology?: string;
    category?: string;
    status?: ChallengeStatusEnum;
    orderBy?: IGetChallengeParams['orderBy'];
}

export default function Challenges() {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);

    const [filters, setFilters] = useState<Filters>({});
    const [isAscOrder, setIsAscOrder] = useState(false);
    const [isGrid, setIsGrid] = useState(false);

    const {
        data: challenges = [],
        isFetching: isChallengesLoading,
    } = useChallenges({
        ...filters,
        authorId: user?.id,
        order: isAscOrder ? 'asc' : 'desc',
    });

    const { mutate: deleteChallenge } = useDeleteChallenge();

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
        const value = event.target.value;

        setFilters((prevState) => ({
            ...prevState,
            [key]: NONE === value ? undefined : value,
        }))
    };

    const getFilterProps = (id: keyof Filters) => ({
        id,
        value: filters[id],
        onChange: handleFilterChange(id),
    });

    const getChallengeImage = (image?: string) => {
        return image ? getBase64Image(image) : imagePlaceholder;
    }

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
            <div>
                <div className='flex justify-between items-center mb-16'>
                    <div>
                        <h1 className='text-4xl font-semibold mb-4'>
                            {t('pages.dashboard.challenges.title')}
                        </h1>
                        <p className='text-xl'>{t('pages.dashboard.challenges.description')}</p>
                    </div>
                    <button
                        type="button"
                        className='py-3 px-6 font-semibold text-md text-green-800 border
                        border-green-800 rounded-lg transition-all duration-300 ease-in-out hover:border-green-900 hover:text-green-900'
                    >
                        <Link to={'new-challenge'}>
                            {t('pages.dashboard.challenges.add_challenge')}
                        </Link>
                    </button>
                </div>
                <div>
                    <S.ChallengesHeader>
                        <S.Filters>
                            <Select
                                {...getFilterProps('category')}
                                placeholder={t('pages.dashboard.challenges.filters.category.placeholder')}
                                options={categories}
                            />
                            <Select
                                {...getFilterProps('technology')}
                                placeholder={t('pages.dashboard.challenges.filters.technology.placeholder')}
                                options={technologies}
                            />
                            <Select
                                {...getFilterProps('status')}
                                placeholder={t('pages.dashboard.challenges.filters.status.placeholder')}
                                options={statuses}
                            />
                            <Select
                                {...getFilterProps('orderBy')}
                                placeholder={t('pages.dashboard.challenges.filters.order.placeholder')}
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
                    {!isGrid ? (
                        <S.List>
                            {challenges.map(({
                                id,
                                title,
                                category,
                                technologies,
                                status,
                            }, index) => (
                                <S.ListItem key={id}>
                                    <S.Title>
                                        <small>{(index + 1).toString().padStart(2, '0')}</small>
                                        <strong>{title}</strong>
                                    </S.Title>
                                    <div className={'challenge'}>
                                        <div className={'challenge-info'}>
                                            <span
                                                style={{ color: challengeStatuses[status].color }}
                                                className={'challenge-info-status'}
                                            >
                                                <GrStatusGoodSmall />
                                                <small>
                                                    {challengeStatuses[status].label}
                                                </small>
                                            </span>
                                            <span className={'challenge-info-category'}>
                                                {category?.name}
                                            </span>
                                            <span className={'challenge-info-techs'}>
                                                {technologies.map((technology) => technology.name).join(' / ')}
                                            </span>
                                        </div>
                                        <S.ChallengeActions>
                                            <S.Action type='edit'>
                                                <MdEdit />
                                            </S.Action>
                                            <S.Action type='delete' onClick={() => deleteChallenge(id)}>
                                                <IoMdTrash />
                                            </S.Action>
                                        </S.ChallengeActions>
                                    </div>
                                </S.ListItem>
                            ))}
                        </S.List>
                    ) : (
                        <S.Grid>
                            {challenges.map(({
                                id,
                                title,
                                status,
                                category,
                                technologies,
                                image,
                            }) => (
                                <S.GridItem key={id}>
                                    <img src={getChallengeImage(image?.file)} alt="" />
                                    <div className={'grid-item-info'}>
                                        <strong>
                                            <span>{title}</span>
                                            <MdEdit />
                                        </strong>
                                        <div className={'grid-item-info-badges'}>
                                            <span style={{ color: challengeStatuses[status].color }}>
                                                <GrStatusGoodSmall />
                                                {challengeStatuses[status].label}
                                            </span>
                                            <span>
                                                {category?.name}
                                            </span>
                                            <span className={'grid-item-info-badges-techs'}>
                                                {technologies.map((technology) => technology.name).join(' / ')}
                                            </span>
                                        </div>
                                    </div>
                                </S.GridItem>
                            ))}
                        </S.Grid>
                    )}
                </div>
            </div>
        </>
    );
}
