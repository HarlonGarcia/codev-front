import { styled } from 'styles';
import { WrapperWithPadding } from 'styles/wrapper';

const Container = styled(WrapperWithPadding, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  maxWidth: '40rem',
  margin: '0 auto',

  'h1, p, a': {
    textAlign: 'center',
  },

  'h1': {
    fontSize: '1.25rem',
    fontWeight: 700,
    letterSpacing: '0.2rem',
    lineHeight: 1.25,
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
  },

  'p': {
    fontSize: '2rem',
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