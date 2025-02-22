import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Svg } from 'assets/svg';
import dayjs from 'dayjs';
import { challengeStatuses } from 'enums/challengeStatus';
import i18next from 'i18next';
import { LuUsers } from "react-icons/lu";
import { useUserMetrics } from 'services/user';
import { MONTH_FULL_NAME_FORMAT } from 'utils/constants';

import { StatusPercentage } from './partials/StatusPercentage';

import './styles.scss';

export default function Stats() {
    const { t } = useTranslation();

    const { data: metrics } = useUserMetrics();
  
    const currentMonth = useMemo(
        () => dayjs().format(MONTH_FULL_NAME_FORMAT),
        [i18next.resolvedLanguage],
    );

    const challengesInCurrentMonth = metrics?.currentMonth.streak ?? 0;
    const highestStreak = metrics?.highestStreak ?? challengesInCurrentMonth;

    return (
        <>
            <div className='mb-16'>
                <h1 className='mb-2 text-3xl font-semibold md:text-4xl md:mb-4'>
                    {t('pages.dashboard.stats.title')}
                </h1>
                <p className='sm:text-xl'>{t('pages.dashboard.stats.description')}</p>
            </div>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-6'>
                <StatusPercentage
                    value={metrics?.currentMonth.challenges.toBegin || 0}
                    total={challengesInCurrentMonth}
                    status={challengeStatuses.TO_BEGIN}
                />
                <StatusPercentage
                    value={metrics?.currentMonth.challenges.inProgress || 0}
                    total={challengesInCurrentMonth}
                    status={challengeStatuses.IN_PROGRESS}
                />
                <StatusPercentage
                    value={metrics?.currentMonth.challenges.finished || 0}
                    total={challengesInCurrentMonth}
                    status={challengeStatuses.FINISHED}
                />
                <StatusPercentage
                    value={metrics?.currentMonth.challenges.canceled || 0}
                    total={challengesInCurrentMonth}
                    status={challengeStatuses.CANCELED}
                />
                <div className='relative flex flex-col items-center justify-between w-full col-span-1 overflow-hidden rounded-3xl 3xl:col-span-2'>
                    <p className='p-8 mb-10 text-center text-pink-100 3xl:p-10'>
                        <Trans
                            values={{ challenges: challengesInCurrentMonth }}
                            components={{ span: <span className='px-1 text-2xl font-semibold text-green-800' /> }}
                        >
                            {'pages.dashboard.stats.cards.challenge.description'}
                        </Trans>
                    </p>
                    <div className='flex items-end gap-2 3xl:gap-6'>
                        <span className='hidden h-10 w-14 bg-gradient-to-t from-green-800/30 via-green-900/10 4xl:block' />
                        <span className='hidden w-10 h-32 bg-gradient-to-t from-green-800/30 via-green-900/10 md:w-12 3xl:w-14 3xl:block' />
                        <span className='hidden h-24 w-14 bg-gradient-to-t from-green-800/30 via-green-900/10 3xl:block' />
                        <span className='w-10 h-36 bg-gradient-to-t from-green-800/30 via-green-900/10 md:w-12 3xl:w-14' />
                        <span className='w-10 h-10 bg-gradient-to-t from-green-800/30 via-green-900/10 md:w-12 3xl:w-14' />
                        <span className='w-10 h-20 bg-gradient-to-t from-green-800/30 via-green-900/10 md:w-12 3xl:w-14' />
                        <div className='relative'>
                            <h2 className='absolute text-base text-pink-700 uppercase -left-4 -top-6 sm:text-xs md:text-sm md:-top-8 3xl:text-base 3xl:-left-5 3xl:font-semibold'>
                                {currentMonth}
                            </h2>
                            <div className='w-10 h-48 bg-green-900 md:w-12 3xl:w-14' />
                        </div>
                    </div>
                    <div className='absolute top-0 left-0 w-full h-full cd-month-chart'></div>
                </div>
                <div className='flex flex-col items-center justify-center w-full text-purple-900 bg-pink-900 rounded-3xl sm:flex-row'>
                    <div className='flex flex-col items-center justify-center p-10 rounded-3xl'>
                        <div className='flex items-center justify-center gap-2 pb-2'>
                            <LuUsers size={40} />
                            <span className='text-5xl text-pink-100 font-fira'>
                                {metrics?.participantsCount}
                            </span>
                        </div>
                        <span className='text-xl font-semibold text-center 2xl:text-2xl'>
                            {t('pages.dashboard.stats.cards.participants.total')}
                        </span>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center w-full p-8 text-pink-700 bg-purple-800 rounded-3xl'>
                    <div className='flex items-center justify-center pb-4 pr-2'>
                        <Svg.Streak />
                        <span className='text-5xl text-pink-100 font-fira'>
                            {highestStreak}
                        </span>
                    </div>
                    <span className='text-xl font-semibold text-center 2xl:text-2xl'>
                        {t('pages.dashboard.stats.cards.streak.label')}
                    </span>
                </div>
            </div>
        </>
    );
}