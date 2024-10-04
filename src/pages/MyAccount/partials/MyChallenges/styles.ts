import { styled } from 'styles';
import { WrapperWithPadding } from 'styles/wrapper';

const Container = styled(WrapperWithPadding, {
  '& > div': {
    maxWidth: '30rem',
    margin: '0 auto',
  },
});

export {
  Container,
};