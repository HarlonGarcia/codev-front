import { useTranslation } from 'react-i18next';

import * as S from './styles';
import Typer from '../../components/Typer';

export default function Home() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.home' });

  return (
    <S.Container>
      <S.Section>
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
      </S.Section>
      <S.Section>
        <S.Title>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </S.Title>
        <S.Paragraph>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum aspernatur, error distinctio nostrum molestias minus.
        </S.Paragraph>
      </S.Section>
    </S.Container>
  );
}