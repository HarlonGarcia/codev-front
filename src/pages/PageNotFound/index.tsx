import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import * as S from './styles';

export default function PageNotFound() {
  const { t } = useTranslation();

  return (
    <S.Container>
      <h1>{t('pages.not_found.title')}</h1>
      <p>{t('pages.not_found.description')}</p>
      <Link to="/">{t('pages.not_found.return')}</Link>
    </S.Container>
  );
}
