import { styled } from '../../styles';
import { WrapperWithPadding } from '../../styles/wrapper';

const Container = styled(WrapperWithPadding, {});

const Challenges = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2rem',

  padding: '1rem',

  '@xl3': {
    gap: '3.25rem',
  }
});

const Challenge = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  padding: '2rem',
  
  width: '100%',
  
  background: '$glass',
  border: '1px solid $shadow',
  borderRadius: '0.5rem',
  boxShadow: '0 0px 2px rgba(45, 42, 85, 1)',

  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',

  '&:hover': {
    border: '1px solid $title',

    '& > img': {
      transform: 'scale(0.98)',
    }
  },

  '@md': {
    width: '47.41%'
  },
  
  '@xl': {
    width: '31%'
  },

  '@xl3': {
    width: '21.9%'
  }
});

const ChallengeHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  
  marginBottom: '1rem',

  '& > h2': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  '& > span': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },

  '& .red': {
    color: '$error',
  },

  '& .yellow': {
    color: '$alert',
  },
  
  '& .green': {
    color: '$highlight',
  },

  '@sm': {
    gap: '1rem',
  }
});

const Image = styled('img', {
  position: 'relative',
  height: '16rem',

  marginBottom: '1rem',
  
  borderRadius: '0.25rem',
  transition: 'transform 0.3s ease-in-out',
  
  objectFit: 'cover',
  pointerEvents: 'none',
  userSelect: 'none',
  draggable: 'false',
});

const JoinChallenge = styled('button', {
  width: '100%',
  
  padding: '0.75rem',
  margin: '0 auto',

  color: '$text',
  background: '$secondary',
  borderRadius: '0.5rem',

  fontSize: '1rem',
  fontWeight: 600,

  transition: 'all 0.3s ease-in-out',

  '&:hover': {
    color: '$secondary',
    background: '$title',
  }
});

export { Container, Challenges, Challenge, ChallengeHeader, Image, JoinChallenge };