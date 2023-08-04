import { styled } from '../../../styles';
import { WrapperWithPadding } from '../../../styles/wrapper';

const Container = styled(WrapperWithPadding, {
  '& > h2': {
    marginBottom: '1.5rem',

    '@xs': {
      fontSize: '1.25rem',
    },
  },
});

const Footer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  '@md': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const Info = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1.5rem',

  '& > h3': {
    marginBottom: '1.25rem',
    color: '$title',
    fontWeight: 400,
    fontSize: '1rem',

    '& > strong': {
      textTransform: 'capitalize',
    },

    '@xs': {
      fontSize: '1.25rem',
    },
  },
});

const Technologies = styled('ul', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  listStyle: 'none',
  
  '& > li': {
    fontSize: '0.875rem',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.5rem',
    backgroundColor: '$secondary',
  },

  '@sm': {
    gap: '0.75rem',

    '& > li': {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
});

const JoinChallengeButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.75rem',

  padding: '1rem'
  ,
  color: '$highlight',
  backgroundColor: '$secondary',
  
  fontSize: '1.25rem',
  fontWeight: 600,
  borderRadius: '0.5rem',
  
  transition: 'all 0.3s ease-in-out',

  '&:hover': {
    color: '$secondary',
    backgroundColor: '$highlight',
  },

  '& > span': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& > *': {
      width: '1.5rem',
      height: '1.5rem',
    },
  },

  '@md': {
    height: 'fit-content',
    padding: '1rem 1.5rem',
    fontSize: '1.25rem',
  },

  '@lg': {
    padding: '1rem 2rem',
  },
});

export { Container, Footer, JoinChallengeButton, Info, Technologies };