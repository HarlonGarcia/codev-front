import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import * as S from './styles';

interface PageNotFoundProps {
  placeholder?: string;
}
export default function PageNotFound({ placeholder: placeholderText }: PageNotFoundProps) {
  const { t } = useTranslation();

  const placeholder = placeholderText || t('pages.not_found.description');

  return (
    <S.Container>
      <h1>{t('pages.not_found.title')}</h1>
      <p>{placeholder}</p>
      <Link to="/">{t('pages.not_found.return')}</Link>
    </S.Container>
  );
}
