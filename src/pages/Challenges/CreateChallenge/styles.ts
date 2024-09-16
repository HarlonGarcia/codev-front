import { styled } from 'styles';
import { WrapperWithPadding } from 'styles/wrapper';

const Container = styled(WrapperWithPadding, {
  maxWidth: '80rem',
  margin: '0 auto',
});

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

const SelectedTechnologies = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  '& > strong': {
    color: '$highlight',
    fontSize: '1.25rem',
    fontWeight: '600',
  },
});

const Technology = styled('ul', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',

  '& > li': {
    display: 'flex',
    alignItems: 'center',

    gap: '0.625rem',
    padding: '0.625rem 0.75rem 0.625rem 1rem',
    backgroundColor: '$secondary',
    borderRadius: '0.25rem',

    '& > span': {
      fontFamily: '$code',
      fontSize: '1rem',
    },

    '& > button': {
      display: 'flex',
      alignItems: 'center',
      color: '$error',

      '& > *': {
        width: '1rem',
        height: '1rem',
      },

      '&:hover': {
        filter: 'brightness(0.8)',
      },
    },
  },
});

const Group = styled('div', {
  display: 'grid',
  flexWrap: 'wrap',
  gridTemplateColumns: '1fr',
  
  gap: '3rem',
  marginBottom: '1.5rem',
  
  '@xs': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@md': {
    gap: '1.5rem',
  },
  '@lg': {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2.5rem',
  },
});

const Submit = styled('input', {
  width: 'fit-content',
  padding: '0.75rem 2rem',

  color: '$highlight',
  backgroundColor: '$secondary',
  fontWeight: '600',

  border: 'none',
  borderRadius: '0.25rem',
  outline: 'none',

  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',

  '&:hover': {
    color: '$secondary',
    backgroundColor: '$highlight',
  },

  '@xs': {
    padding: '1rem 3rem',
    fontSize: '1.125rem',
  }
});

export {
  Container,
  Form,
  SelectedTechnologies,
  Technology,
  Group,
  Submit,
};