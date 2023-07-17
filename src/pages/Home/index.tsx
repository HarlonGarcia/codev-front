import * as S from './styles';
import Typer from '../../components/Typer';

export default function Home() {
  const userOS = () => {
    if (navigator.userAgent.indexOf('Mac') != -1) {
      return '⌘';
    }
    return 'Win';
  };

  return (
    <S.Container>
      <S.Section>
        <S.Title font='code'>
          {'=> '}
          <Typer />
        </S.Title>
        <S.Instruction>
          Pressione{' '}
          <span><span>{userOS()}</span></span>
          +
          <span><span>K</span></span>
          {' '}pra abrir a lista de comandos
        </S.Instruction>
      </S.Section>
      <S.Section>
        <S.Title>
          Aumente seu nível na programação
        </S.Title>
        <S.Paragraph>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum aspernatur, error distinctio nostrum molestias minus.
        </S.Paragraph>
      </S.Section>
    </S.Container>
  );
}