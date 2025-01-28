import { ChangeEvent, useContext, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import imagePlaceholder from 'assets/images/card-image-placeholder-2.png'
import { DeleteChallengeDialog } from 'components/Dialog/DeleteChallengeDialog';
import { Select } from 'components/Select';
import { AuthContext } from 'contexts/AuthContext';
import { challengesOrderBy } from 'enums/challengeOrderBy';
import { challengeStatuses } from 'enums/challengeStatus';
import { FaArrowUpAZ, FaArrowDownAZ } from "react-icons/fa6";
import { GrStatusGoodSmall } from "react-icons/gr";
import { IoMdList, IoMdTrash } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { MdEdit, MdGridView } from "react-icons/md";
import { useCategories } from 'services/category';
import { useChallenges, useDeleteChallenge } from 'services/challenge';
import { IGetChallengeParams } from 'services/challenge/types';
import { useTechnologies } from 'services/technology';
import { ChallengeStatusEnum, IChallenge } from 'types';
import { getBase64Image } from 'utils';
import { NONE } from 'utils/constants';

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
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [selectedChallenge, setSelectedChallenge] = useState<IChallenge | null>(null);

    const {
        data: challenges = [],
    } = useChallenges({
        ...filters,
        authorId: user?.id,
        order: isAscOrder ? 'asc' : 'desc',
    });

    const { mutate: deleteChallenge } = useDeleteChallenge();

    const {
        data: categoriesItems = [],
    } = useCategories();

    const {
        data: technologiesItems = [],
    } = useTechnologies();

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

    const handleChallengeAction = (challenge: IChallenge | null, visible = true) => {
        setIsModalOpened(visible);
        setSelectedChallenge(challenge);
    };

    const handleDeleteChange = () => {
        if (selectedChallenge) {
            deleteChallenge(selectedChallenge.id);
        }

        handleChallengeAction(null, false);
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

    const statuses = Object.values(challengeStatuses).map(({ id, label }) => ({
        key: id,
        value: id,
        label,
    }));
  
    return (
        <>
            <DeleteChallengeDialog
                visible={isModalOpened}
                onCancel={() => handleChallengeAction(null, false)}
                onConfirm={handleDeleteChange}
                title={
                    <Trans>
                        {'pages.dashboard.challenges.delete.modal.title'}
                    </Trans>
                }
                description={
                    <Trans
                        values={{ challenge: selectedChallenge?.title }}
                    >
                        {'pages.dashboard.challenges.delete.modal.description'}
                    </Trans>
                }
            />
            <div className='flex flex-col justify-between mb-16 lg:flex-row lg:items-center'>
                <div className='mb-8'>
                    <h1 className='mb-2 text-3xl font-semibold md:text-4xl md:mb-4'>
                        {t('pages.dashboard.challenges.title')}
                    </h1>
                    <p className='sm:text-xl'>{t('pages.dashboard.challenges.description')}</p>
                </div>
                <Link
                    to={'new-challenge'}
                    className='flex items-center gap-2 p-3 font-semibold text-green-800 transition-all duration-300 ease-in-out border-4 border-green-800 rounded-lg w-fit text-md hover:border-green-900 hover:text-green-900'
                >
                    <LuPlus size={20} />
                    <Trans>{'pages.dashboard.challenges.add_challenge'}</Trans>
                </Link>
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
                        {challenges.map((challenge, index) => (
                            <S.ListItem key={challenge.id}>
                                <S.Title>
                                    <small>{(index + 1).toString().padStart(2, '0')}</small>
                                    <strong>{challenge.title}</strong>
                                </S.Title>
                                <div className={'flex items-center gap-8'}>
                                    <div className={'hidden items-center gap-2 lg:flex'}>
                                        <span
                                            style={{ color: challengeStatuses[challenge.status].color }}
                                            className={'flex items-center gap-2 py-2 px-3 bg-purple-900 text-xl font-semibold rounded-lg'}
                                        >
                                            <GrStatusGoodSmall size={10} />
                                            <small>
                                                {challengeStatuses[challenge.status].label}
                                            </small>
                                        </span>
                                        <span className={'py-2 px-3 bg-pink-700 font-semibold rounded-lg text-purple-700'}>
                                            {challenge.category?.name}
                                        </span>
                                        <span className={'py-2 px-3 bg-green-800 font-semibold rounded-lg text-purple-700'}>
                                            {challenge.technologies?.map((technology) => technology.name).join(' / ')}
                                        </span>
                                    </div>
                                    <S.ChallengeActions>
                                        <S.Action type='edit'>
                                            <MdEdit />
                                        </S.Action>
                                        <S.Action type='delete' onClick={() => handleChallengeAction(challenge)}>
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
                                    <div className={'hidden grid-item-info-badges'}>
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
        </>
    );
}
