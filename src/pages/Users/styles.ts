import { styled } from '../../styles/index';
import { WrapperWithPadding } from '../../styles/wrapper';

const Container = styled(WrapperWithPadding, {
  backgroundColor: '$primary',
  background: 'linear-gradient(to top left, rgba(124, 58, 237, 0.1), rgb(2, 1, 10))',
});

export { Container };