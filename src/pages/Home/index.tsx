import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation, Translation } from 'react-i18next';

import * as S from './styles';
import Typer from '../../components/Typer';
import { Svg } from '../../assets/svg';
import { useCustomSelector } from '../../store/useCustomSelector';
import { AppDispatch } from '../../store';
import { getChallenges } from '../../store/features/challengeSlice';

const possibilities = [{
  id: 'solution',
  label: <Translation>{(t) => <span>{t('pages.home.goals.cards.solution')}</span>}</Translation>,
  icon: <Svg.Solution />,
}, 
{
  id: 'code',
  label: <Translation>{(t) => <span>{t('pages.home.goals.cards.code')}</span>}</Translation>,
  icon: <Svg.Code />,
}, 
{
  id: 'compare',
  label: <Translation>{(t) => <span>{t('pages.home.goals.cards.compare')}</span>}</Translation>,
  icon: <Svg.Compare />,
}];

export default function Home() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.home' });

  const dispatch = useDispatch<AppDispatch>();
  const { latestChallenges } = useCustomSelector((state) => state.challenges);

  useEffect(() => {
    const filters = {
      orderBy: 'LATEST',
      page: 0,
      size: 4,
    };

    dispatch(getChallenges(filters));
  }, [dispatch]);

  return (
    <S.Container>
      <S.Hero >
        <div>
          <S.Title font='code'>
            {'=> '}
            <Typer />
          </S.Title>
          <S.Instruction>
            {t('instruction.press') + ' '}
            <span><span>⌘</span></span>
            +
            <span><span>K</span></span>
            {' ' + t('instruction.action')}
          </S.Instruction>
        </div>
      </S.Hero>
      <S.Section>
        <S.Title>
          {t('goals.title')}
        </S.Title>
        <S.Paragraph>
          {t('goals.description')}
        </S.Paragraph>
        <S.Possibilities>
          {possibilities.map((possibility, index) => (
            <S.CardItem 
              key={possibility.id}
              animation={index % 2 !== 0 ? 'diff' : undefined}
            >
              {possibility.label}
              {possibility.icon}
            </S.CardItem>
          ))}
        </S.Possibilities>
      </S.Section>
      <S.Section>
        <S.Title>
          {t('latest.title')}
        </S.Title>
        <div className='latest_challenges'>
          <S.LatestChallenges>
            {latestChallenges.map((challenge) => (
              <div key={challenge.id}>
                <small>
                  {challenge.title}
                </small>
                <span>
                  {t('latest.badge')}
                </span>
              </div>
            ))}
          </S.LatestChallenges>
          <div className='expand_challenges' />
        </div>
        <Link to='/challenges'>
          {t('latest.link')}
        </Link>
      </S.Section>
    </S.Container>
  );
}