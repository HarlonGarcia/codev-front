import { styled } from '@styles';
import { textAreaVariants } from './variants';

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  variants: textAreaVariants.wrapper,

  '& > label': {
    fontSize: '0.925rem',
    color: '$highlight',
    marginBottom: '0.25rem',
  },

  '& > span': {
    fontSize: '0.875rem',
    color: '$error',
  },

  '@sm': {
    gap: '0.625rem',

    '& > label': {
      fontSize: '1rem',
    },
  }
});

const ContentArea = styled('textarea', {
  width: '100%',
  padding: '0.75rem',

  color: '$text',
  backgroundColor: '$secondary',

  fontFamily: '$code',
  fontSize: '1rem',

  resize: 'none',
  borderRadius: '0.5rem',
  border: 'none',
  outline: 'none',

  '&::placeholder': {
    color: 'rgba(129, 140, 248, 0.2)',
  },

  '&:disabled': {
    cursor: 'not-allowed',
    filter: 'brightness(0.8) grayscale(0.4)',
  },

  '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active': {
    '-webkit-box-shadow': '0 0 0 30px #120F26 inset',
    '-webkit-text-fill-color': '#c392ef',
    '-webkit-background-clip': 'text',
    transition: 'background-color 5000s ease-in-out 0s',
    boxShadow: 'inset 0 0 20px 20px #120F26',
  },

  '@xl': {
    padding: '1.25rem',
  }
});

export { Wrapper, ContentArea };