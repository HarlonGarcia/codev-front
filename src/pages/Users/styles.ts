import { styled } from '../../styles/index';
import { WrapperWithPadding } from '../../styles/wrapper';

const Container = styled(WrapperWithPadding, {
  backgroundColor: '$primary',
  background: 'linear-gradient(to top left, rgba(124, 58, 237, 0.1), rgb(2, 1, 10))',
});

const UserList = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',
  
  '@xs': {
    gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
    padding: '1rem',
  }
});

export { Container, UserList };