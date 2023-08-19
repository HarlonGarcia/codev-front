import { styled } from '../../../styles';
import { WrapperWithPadding } from '../../../styles/wrapper';

const Container = styled(WrapperWithPadding, {
});

const Header = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.75rem',

  fontSize: '0.925rem',
  marginBottom: '2.5rem',

  '& > *': {
    textAlign: 'center',
  },

  '@sm': {
    fontSize: '1.25rem',
  }
});

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.75rem',
  
  maxWidth: '26rem',
  margin: '0 auto',
  
  '& > button': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',

    width: '100%',
    padding: '0.75rem',
    margin: '0 auto',
    marginTop: '0.75rem',

    color: '$secondary',
    backgroundColor: '$title',
    borderRadius: '0.5rem',

    fontSize: '0.925rem',
    fontWeight: '600',

    transition: 'all 0.3s ease-in-out',

    '&:hover': {
      filter: 'brightness(0.8)',
    },

    '&:focus': {
      filter: 'brightness(0.4)',
    },

    '& > svg': {
      height: '1.25rem',
      width: '1.25rem',
    },
  },

  '@xs': {
    '& > button': {
      width: '75%',
      marginTop: '1rem',
      fontSize: '1rem',
    },
  }
});

const InputGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',

  '& > label': {
    fontSize: '0.925rem',
    color: '$highlight',
  },

  '& > input': {
    padding: '0.75rem',

    color: '$text',
    backgroundColor: '$secondary',

    fontFamily: '$code',
    fontSize: '1rem',

    borderRadius: '0.5rem',
    border: 'none',
    outline: 'none',
  },

  '@sm': {
    gap: '1rem',

    '& > label': {
      fontSize: '1rem',
    },
  }
});

export { Container, Header, Form, InputGroup };