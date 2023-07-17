import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as S from './styles';
import Typer from '../../components/Typer';
import { extraShortcuts, goToShortcuts } from '../../utils/shortcuts';
import { closeCommanderModal } from '../../store/features/commander-slice';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyPressed = event.key.toUpperCase();

      if (goToShortcuts[keyPressed]) {
        event.preventDefault();
        goToShortcuts[keyPressed].goTo?.(navigate);
        dispatch(closeCommanderModal());
      }

      if (extraShortcuts[keyPressed]) {
        event.preventDefault();
        extraShortcuts[keyPressed].action();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [ navigate, dispatch ]);

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