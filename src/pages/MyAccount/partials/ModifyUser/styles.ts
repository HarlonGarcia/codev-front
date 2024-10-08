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

const FormWrapper = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '4rem',
  marginTop: '2rem',

  '.image-input': {
    alignSelf: 'center',
  },

  '> button': {
    width: 'fit-content',
    padding: '0.75rem 2rem',

    fontSize: '1rem',
    fontWeight: 600,
    
    borderRadius: '0.35rem',
    border: '1px solid transparent',
    background: '$secondary',
    color: '$highlight',
    transition: 'all 0.3s ease-in-out',

    '&:hover:not(:disabled)': {
      borderColor: '$highlight',
      boxShadow: '0px 0px 2px #50fa7b',
    },

    '&:disabled': {
      color: '$highlightDarker',
      cursor: 'not-allowed',
    },
  }
});

export {
  Container,
  Header,
  FormWrapper,
};