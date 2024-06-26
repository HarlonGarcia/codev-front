import { styled } from '../../../styles';
import { WrapperWithPadding } from '../../../styles/wrapper';

const Container = styled(WrapperWithPadding, {
  '& > h2': {
    color: '$highlight',
    fontSize: '1.25rem',
    marginBottom: '1.5rem',

    '@xs': {
      fontSize: '1.5rem',
    },
    '@md': {
      fontSize: '2rem',
    },
  },
});

const Details = styled('div', {
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

  '& > div, & > small': {
    marginBottom: '1.25rem',
    color: '$coolgrey',
    fontSize: '1rem',
    fontWeight: 600,

    '@xs': {
      fontSize: '1.25rem',
    },
  },

  '& > div': {
    display: 'flex',
    gap: '0.25rem',

    ':last-child': {
      color: '$lavender',
      textTransform: 'capitalize',
    },
  },
});

const Technologies = styled('ul', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  listStyle: 'none',

  '& > li': {
    letterSpacing: '0.125rem',
    padding: '0.5rem 0.75rem',

    backgroundColor: '$secondary',
    fontSize: '0.75rem',
    fontFamily: '$code',
    textTransform: 'uppercase',
    borderRadius: '0.5rem',
  },

  '@sm': {
    gap: '0.75rem',

    '& > li': {
      fontSize: '0.825rem',
      fontWeight: 600,
    },
  },
});

const Button = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  gap: '0.75rem',
  padding: '1rem',

  color: '$highlight',
  backgroundColor: '$secondary',
  fontSize: '1rem',
  fontWeight: 600,
  borderRadius: '0.5rem',
  transition: 'all 0.3s ease-in-out',

  '&:hover': {
    color: '$secondary',
    backgroundColor: '$highlight',
  },

  '& > svg': {
    display: 'none',
    width: '1.5rem',
    height: '1.5rem',
  },
  
  '@xs': {
    '& > svg': {
      display: 'block',
    },
  },
  '@md': {
    height: 'fit-content',
    padding: '1rem 1.5rem',
    fontSize: '1.175rem',
  },
  '@lg': {
    padding: '1rem 2rem',
  },
});

export {
  Container,
  Details,
  Button,
  Info,
  Technologies,
};