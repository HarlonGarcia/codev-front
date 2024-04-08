import { Translation } from 'react-i18next';

import { Svg } from '../../../assets/svg';

export const possibilities = [{
  id: 'solution',
  label: (
    <Translation>
      {(t) => <span>{t('pages.home.goals.cards.solution')}</span>}
    </Translation>
  ),
  icon: <Svg.Solution />,
},
{
  id: 'code',
  label: (
    <Translation>{
      (t) => <span>{t('pages.home.goals.cards.code')}</span>}
    </Translation>
  ),
  icon: <Svg.Code />,
},
{
  id: 'compare',
  label: (
    <Translation>
      {(t) => <span>{t('pages.home.goals.cards.compare')}</span>}
    </Translation>
  ),
  icon: <Svg.Compare />,
}];