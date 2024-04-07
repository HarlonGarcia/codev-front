import { styled } from '../../styles';
import { WrapperWithPadding } from '../../styles/wrapper';

const Container = styled(WrapperWithPadding, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  maxWidth: '30rem',
  margin: '0 auto',

  'h1, p, a': {
    textAlign: 'center',
  },

  'h1': {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
  },

  'p': {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    fontWeight: 600,
  },

  'a': {
    color: '$highlight',

    '&:hover': {
      textDecoration: 'underline',
    },
  }
});

export { Container };