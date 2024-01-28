import { useState } from 'react';
import TypeIt from 'typeit-react';
import { styled } from '../styles';

const CodeError = styled('small', {
  fontSize: '1rem',
  fontFamily: '$code',
  color: '$error',
  
  '@sm': {
    fontSize: '1.25rem',
  }
});

const ANIMATION_SPEED = 100;

export default function Typer() {
  const [error, setError] = useState(false);

  const animateText = (instance: Node | any) => {
    instance
      .type('Let\'s go, dev')
      .pause(ANIMATION_SPEED * 7.5).move(-3)
      .pause(ANIMATION_SPEED * 2).delete(4)
      .pause(ANIMATION_SPEED).type('co')
      .pause(ANIMATION_SPEED).move(3).type('!')
      .pause(ANIMATION_SPEED * 10).delete(12)
      .pause(ANIMATION_SPEED).type("<code>git push</code>")
      .pause(ANIMATION_SPEED * 3);

    return instance;
  };

  const afterComplete = () => {
    setError(true);
  };

  return (
    <>
      <TypeIt getBeforeInit={animateText} options={{afterComplete}} /><br />
      {error && <CodeError>error: failed to push</CodeError>}
    </>
  );
}
