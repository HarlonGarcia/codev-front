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

const Legend = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '0.5rem 1.5rem',
  marginBottom: '4rem',

  '> div': {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    color: '$lavender',

    '> div': {
      width: '0.5rem',
      height: '0.5rem',
      backgroundColor: '$title',
      borderRadius: '50%',
    },
  }
});

const NoChallenge = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'center',

  textAlign: 'center',
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
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: '3rem 1.5rem',
  
  '.my-challenges-card': {
    background: '$secondary',

    img: {
      width: '100%',
      objectFit: 'cover',
      height: '15rem',
    },
  
    '&-footer': {
      borderBottom: '2px solid $coolgrey',
    },
  },

  'h2': {
    fontFamily: '$default',
    fontWeight: '500',
    color: '$highlight',
  },

  '@sm': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@lg': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  '@xl2': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  }
});

const Status = styled('span', {
  fontSize: '1.5rem',
});

export {
  Container,
  Header,
  Legend,
  NoChallenge,
  Challenges,
  Status,
};