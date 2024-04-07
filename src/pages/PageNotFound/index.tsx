import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import * as S from './styles';

export default function PageNotFound() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.not_found' });

  return (
    <S.Container>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <Link to="/">{t('go_back')}</Link>
    </S.Container>
  );
}
