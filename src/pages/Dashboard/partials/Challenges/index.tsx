import { ChangeEvent, useContext, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { DeleteChallengeDialog } from 'components/Dialog/DeleteChallengeDialog';
import { Pagination } from 'components/Pagination';
import { Select } from 'components/Select';
import { AuthContext } from 'contexts/AuthContext';
import { challengesOrderBy } from 'enums/challengeOrderBy';
import { challengeStatuses } from 'enums/challengeStatus';
import { FaArrowUpAZ, FaArrowDownAZ } from "react-icons/fa6";
import { IoMdList } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import { MdGridView } from "react-icons/md";
import { useCategories } from 'services/category';
import { useChallenges, useDeleteChallenge } from 'services/challenge';
import { IGetChallengeParams } from 'services/challenge/types';
import { useTechnologies } from 'services/technology';
import { twMerge } from 'tailwind-merge';
import { ChallengeStatusEnum, IChallenge } from 'types';
import { NONE } from 'utils/constants';

import { Grid } from './partials/Grid';
import { List } from './partials/List';

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
    const [page, setPage] = useState(0);
    const [selectedChallenge, setSelectedChallenge] = useState<IChallenge | null>(null);

    const {
        data: { items = [], pagination } = {},
    } = useChallenges({
        ...filters,
        page,
        size: 12,
        authorId: user?.id,
        order: isAscOrder ? 'asc' : 'desc',
    });

    const { data: allCategories = [] } = useCategories();
    const { data: allTechnologies = [] } = useTechnologies();
    const { mutate: deleteChallenge } = useDeleteChallenge();

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

    const handleChallengeAction = (challenge: IChallenge | null, visible = true) => {
        setIsModalOpened(visible);
        setSelectedChallenge(challenge);
    };
    
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    };

    const handleDeleteChange = () => {
        if (selectedChallenge) {
            deleteChallenge(selectedChallenge.id);
        }

        handleChallengeAction(null, false);
    }

    const categories = useMemo(() => {
        return allCategories.map(({ id, name }) => ({
            key: id,
            value: id,
            label: name,
        }))
    }, [allCategories]);

    const technologies = useMemo(() => {
        return allTechnologies.map(({ id, name }) => ({
            key: id,
            value: id,
            label: name,
        }))
    }, [allTechnologies]);

    const statuses = Object.values(challengeStatuses).map(({ id, label }) => ({
        key: id,
        value: id,
        label,
    }));

    const classes = 'text-2xl py-2 bg-purple-800 transition-all duration-300 ease-in-out hover:text-pink-900/80';

    const listButtonClasses = twMerge(classes,
        'pl-2 pr-1 rounded-l-lg',
        !isGrid ? 'text-green-800' : ''
    );

    const gridButtonClasses = twMerge(classes,
        'pr-2 pl-1 rounded-r-lg',
        isGrid ? 'text-green-800' : ''
    );

    return (
        <>
            <DeleteChallengeDialog
                visible={isModalOpened}
                onCancel={() => handleChallengeAction(null, false)}
                onConfirm={handleDeleteChange}
                title={t('pages.dashboard.challenges.delete.modal.title')}
                description={
                    <Trans values={{ challenge: selectedChallenge?.title }}>
                        {'pages.dashboard.challenges.delete.modal.description'}
                    </Trans>
                }
            />
            <div className='flex flex-col justify-between mb-16 lg:flex-row lg:items-center'>
                <div className='mb-8'>
                    <h1 className='mb-2 text-3xl font-semibold md:text-4xl md:mb-4'>
                        {t('pages.dashboard.challenges.title')}
                    </h1>
                    <p className='sm:text-xl'>
                        {t('pages.dashboard.challenges.description')}
                    </p>
                </div>
                <Link
                    to={'new-challenge'}
                    className='flex items-center gap-2 px-3 py-2.5 font-semibold text-green-800 transition-all duration-300 ease-in-out border-2 border-green-800 rounded-lg w-fit text-md hover:text-purple-900 hover:bg-green-800'
                >
                    <LuPlus size={20} />
                    <Trans>{'pages.dashboard.challenges.add_challenge'}</Trans>
                </Link>
            </div>
            <div>
                <div className='flex flex-wrap items-center justify-between gap-4 mb-8'>
                    <div className='flex flex-wrap gap-4'>
                        <Select
                            {...getFilterProps('category')}
                            placeholder={t('pages.dashboard.challenges.filters.category.placeholder')}
                            options={categories}
                            canDeselect
                        />
                        <Select
                            {...getFilterProps('technology')}
                            placeholder={t('pages.dashboard.challenges.filters.technology.placeholder')}
                            options={technologies}
                            canDeselect
                        />
                        <Select
                            {...getFilterProps('status')}
                            placeholder={t('pages.dashboard.challenges.filters.status.placeholder')}
                            options={statuses}
                            canDeselect
                        />
                        <Select
                            {...getFilterProps('orderBy')}
                            placeholder={t('pages.dashboard.challenges.filters.order.placeholder')}
                            options={Object.values(challengesOrderBy)}
                            canDeselect
                        />
                    </div>
                    <div className='flex items-center justify-center gap-4'>
                        <button 
                            className='text-2xl transition-all duration-300 ease-in-out hover:text-pink-900/80'
                            onClick={() => setIsAscOrder((prev) => !prev)}
                        >
                            {isAscOrder ? <FaArrowUpAZ /> : <FaArrowDownAZ />}
                        </button>
                        <div className='flex items-center justify-center'>
                            <button
                                className={listButtonClasses}
                                onClick={() => setIsGrid(false)}
                            >
                                <IoMdList />
                            </button>
                            <button
                                className={gridButtonClasses}
                                onClick={() => setIsGrid(true)}
                            >
                                <MdGridView />
                            </button>
                        </div>
                    </div>
                </div>
                {isGrid ? (
                    <Grid
                        items={items}
                        onEdit={handleChallengeAction}
                        onDelete={handleChallengeAction}
                    />
                ) : (
                    <List
                        items={items}
                        onEdit={handleChallengeAction}
                        onDelete={handleChallengeAction}
                    />
                )}
                <Pagination
                    page={page}
                    total={pagination?.total}
                    size={pagination?.size}
                    onPageChange={handlePageChange}
                    className='mx-auto mt-8'
                />
            </div>
        </>
    );
}
