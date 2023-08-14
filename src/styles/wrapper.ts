import { styled } from '.';

const WrapperDefault = styled('main', {
  minHeight: '100vh',
});

const Wrapper = styled(WrapperDefault, {
  paddingTop: '$navbarHeight',
});

const WrapperWithPadding = styled(WrapperDefault, {
  wrapperPadding: '2.5rem',

  '@sm': {
    wrapperPadding: '3.5rem',
  },

  '@lg': {
    wrapperPadding: '4.5rem',
  },

  '@xl3': {
    maxWidth: '100rem',
    margin: '0 auto',
  }
});

export { Wrapper, WrapperWithPadding };