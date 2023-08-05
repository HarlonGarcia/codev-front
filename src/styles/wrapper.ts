import { styled } from '.';

const WrapperDefault = styled('main', {
  minHeight: '100vh',
});

const Wrapper = styled(WrapperDefault, {
  paddingTop: '$navbarHeight',
});

const WrapperWithPadding = styled(WrapperDefault, {
  wrapperPadding: '2rem',

  '@sm': {
    wrapperPadding: '3rem',
  },

  '@lg': {
    wrapperPadding: '4rem',
  }
});

export { Wrapper, WrapperWithPadding };