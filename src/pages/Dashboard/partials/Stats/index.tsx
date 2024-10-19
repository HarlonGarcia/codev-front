import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { GridItem } from '@chakra-ui/react';
import { Svg } from 'assets/svg';
import dayjs from 'dayjs';
import { challengeStatuses } from 'enums/challengeStatus';
import i18next from 'i18next';
import { FaLock, FaHourglassHalf, FaCalendarCheck } from "react-icons/fa";
import { MONTH_FULL_NAME_FORMAT } from 'utils/constants';

import * as S from './styles';

export default function Stats() {
  const { t } = useTranslation();
  
  const currentMonth = useMemo(
    () => dayjs().format(MONTH_FULL_NAME_FORMAT),
    [i18next.resolvedLanguage],
  );

  return (
    <S.Container>
      <S.Header>
        <h1>{t('pages.dashboard.stats.title')}</h1>
        <p>{t('pages.dashboard.stats.description')}</p>
      </S.Header>
      <S.GridContainer
        w={'fit-content'}
        h='20rem'
        templateRows='repeat(6, 1fr)'
        templateColumns='repeat(6, 1fr)'
        gap={4}
      >
        <S.ChallengesInfo rowSpan={6} colSpan={4}>
          <h2>{currentMonth}</h2>
          <p>
            {t('pages.dashboard.stats.cards.challenge.description', {
              challenges: 10,
            })}
          </p>
          <S.ChallengesStatuses>
            <S.StatusInfo style={{ backgroundColor: challengeStatuses.TO_BEGIN.color }}>
              <FaHourglassHalf />
              <span>{challengeStatuses.TO_BEGIN.label}</span>
              <span>12/20</span>
            </S.StatusInfo>
            <S.StatusInfo style={{ backgroundColor: challengeStatuses.IN_PROGRESS.color }}>
              <FaCalendarCheck />
              <span>{challengeStatuses.IN_PROGRESS.label}</span>
              <span>12/20</span>
            </S.StatusInfo>
            <S.StatusInfo style={{ backgroundColor: challengeStatuses.FINISHED.color }}>
              <FaLock />
              <span>{challengeStatuses.FINISHED.label}</span>
              <span>12/20</span>
            </S.StatusInfo>
          </S.ChallengesStatuses>
        </S.ChallengesInfo>
        <S.Streak rowSpan={3} colSpan={2}>
          <div>
            <Svg.Streak />
            <span>20</span>
          </div>
          <span>{t('pages.dashboard.stats.cards.steak.label')}</span>
        </S.Streak>
        <GridItem rowSpan={3} colSpan={2} />
      </S.GridContainer>
    </S.Container>
  );
}
