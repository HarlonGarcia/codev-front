import { styled } from '../../styles/index';
import { WrapperWithPadding } from '../../styles/wrapper';

const Container = styled(WrapperWithPadding, {
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