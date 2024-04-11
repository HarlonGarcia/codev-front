import { Translation } from 'react-i18next';

import { Svg } from '../../../assets/svg';

export const possibilities = [{
  id: 'solution',
  label: (
    <Translation>
      {(t) => <span>{t('pages.home.introduction.cards.find_solutions')}</span>}
    </Translation>
  ),
  icon: <Svg.Solution />,
},
{
  id: 'coding',
  label: (
    <Translation>{
      (t) => <span>{t('pages.home.introduction.cards.coding')}</span>}
    </Translation>
  ),
  icon: <Svg.Code />,
},
{
  id: 'network',
  label: (
    <Translation>
      {(t) => <span>{t('pages.home.introduction.cards.network')}</span>}
    </Translation>
  ),
  icon: <Svg.Network />,
}];