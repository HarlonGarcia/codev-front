import { styled } from 'styles';
import { WrapperWithPadding } from 'styles/wrapper';

const Container = styled(WrapperWithPadding, {
  display: 'flex',
  flexDirection: 'column',
});

const Header = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '2rem',

  '> h2': {
    fontFamily: '$code',
    fontSize: '1.5rem',
  }
});

const NoChallenge = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'center',

  color: '$coolgrey',
  opacity: '0.7',
  fontSize: '1.25rem',

  '> svg': {
    fontSize: '5rem',
    marginBottom: '1rem',
  } 
});

const Challenges = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',

  '> div': {
    background: '$secondary',
  },

  'h2': {
    fontFamily: '$default',
    fontWeight: '500',
    color: '$highlight',
  },

  '@sm': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  '@md': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  }
});

const Status = styled('span', {
  fontSize: '1.5rem',
});

export {
  Container,
  Header,
  NoChallenge,
  Challenges,
  Status,
};