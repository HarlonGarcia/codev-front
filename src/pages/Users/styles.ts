import { styled } from '../../styles/index';
import { WrapperWithPadding } from '../../styles/wrapper';

const Container = styled(WrapperWithPadding, {
  backgroundColor: '$primary',
  background: 'linear-gradient(to top left, rgba(124, 58, 237, 0.1), rgb(2, 1, 10))',
});

const UserList = styled('section', {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '1rem',

  maxWidth: '68rem',

  '@xs': {
    gap: '1rem',
    padding: '0 1rem',
    maxWidth: '100%',
  },
});

export { Container, UserList };