import { useState } from 'react';
import TypeIt from 'typeit-react';
import { styled } from '../styles';

const CodeError = styled('small', {
  fontSize: '1.25rem',
  fontFamily: '$code',
  color: '$error',
});

export default function Typer() {
  const [error, setError] = useState(false);

  const getBeforeInit = (instance: Node | any) => {
    instance.type('Let\'s go, dev').pause(750).move(-3).pause(200)
    .delete(4).pause(100).type('co').pause(100).move(3).type('!')
    .pause(1000).delete(12).pause(100).type("git <code>push</code>").pause(300);

    return instance;
  };

  const afterComplete = () => {
    setError(true);
  };

  return (
    <>
      <TypeIt getBeforeInit={getBeforeInit} options={{afterComplete}}  /><br />
      {error && <CodeError>error: failed to push</CodeError>}
    </>
  );
}
