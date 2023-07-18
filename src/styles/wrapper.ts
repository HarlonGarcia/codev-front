import { styled } from '.';

const WrapperDefault = styled('main', {
  minHeight: '100vh',
});

const Wrapper = styled(WrapperDefault, {
  paddingTop: '$navbarHeight',
});

const WrapperWithPadding = styled(WrapperDefault, {
  wrapperPadding: '2rem',
});

export { Wrapper, WrapperWithPadding };