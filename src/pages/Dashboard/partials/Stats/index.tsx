import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Svg } from 'assets/svg';
import dayjs from 'dayjs';
import { challengeStatuses } from 'enums/challengeStatus';
import i18next from 'i18next';
import { MONTH_FULL_NAME_FORMAT } from 'utils/constants';

import { StatusPercentage } from './partials/StatusPercentage';

export default function Stats() {
    const { t } = useTranslation();
  
    const currentMonth = useMemo(
        () => dayjs().format(MONTH_FULL_NAME_FORMAT),
        [i18next.resolvedLanguage],
    );

    return (
        <div>
            <div className='mb-16'>
                <h1 className='text-4xl font-semibold mb-4'>
                    {t('pages.dashboard.stats.title')}
                </h1>
                <p className='text-xl'>{t('pages.dashboard.stats.description')}</p>
            </div>
            <div className='max-w-fit grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6'>
                <StatusPercentage
                    value={5}
                    total={10}
                    status={challengeStatuses.TO_BEGIN}
                />
                <StatusPercentage
                    value={3}
                    total={10}
                    status={challengeStatuses.IN_PROGRESS}
                />
                <StatusPercentage
                    value={2}
                    total={10}
                    status={challengeStatuses.FINISHED}
                />
                <div className='flex flex-col justify-center items-center col-span-1 bg-purple-800 rounded-3xl sm:flex-row sm:col-span-2'>
                    <div className='flex flex-col p-10 border-b-2 border-purple-700 sm:border-r-2'>
                        <h2 className='text-green-800 text-4xl font-fira font-semibold uppercase mb-2 lg:text-6xl'>
                            {currentMonth}
                        </h2>
                        <p className='text-pink-100 mb-10'>
                            <Trans
                                values={{ challenges: 10 }}
                                components={{ span: <span className='px-1 text-2xl text-green-800 font-semibold' /> }}
                            >
                                {'pages.dashboard.stats.cards.challenge.description'}
                            </Trans>
                        </p>
                        <div className='flex flex-col mt-auto'>
                            <p className='text-pink-100 mb-2'>
                                <Trans
                                    values={{ challenges: 10 }}
                                    components={{
                                        span: <span className='px-1 text-2xl text-pink-700 font-semibold' />
                                    }}
                                >
                                    {'pages.dashboard.stats.cards.challenge.left'}
                                </Trans>
                            </p>
                            <p className='flex flex-col gap-x-2 text-pink-800 md:flex-row'>
                                <Trans>
                                    {'pages.dashboard.stats.cards.challenge.achievement'}
                                </Trans>
                                <span
                                    className='w-fit py-1 px-2 mt-2 rounded-md border border-purple-300 
                                    bg-purple-700 text-green-800 text-sm md:mt-0'
                                >
                                    Challenger
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center p-10 rounded-3xl'>
                        <div className='flex items-center justify-center pr-2 pb-4'>
                            <Svg.Streak />
                            <span className='font-fira text-pink-100 text-5xl'>20</span>
                        </div>
                        <span className='text-lg'>
                            {t('pages.dashboard.stats.cards.steak.label')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
