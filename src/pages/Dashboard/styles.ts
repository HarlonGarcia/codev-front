import { styled } from 'styles';
import { Wrapper } from 'styles/wrapper';

const Container = styled(Wrapper, {
  wrapperPadding: '2rem',

  '@xs': {
    wrapperPadding: '2.5rem',
  },

  '@sm': {
    wrapperPadding: '3.5rem',
  },

  '@lg': {
    wrapperPadding: '4.5rem',
  },
});

export {
  Container,
};