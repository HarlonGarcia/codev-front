import { styled } from 'styles';
import { inputVariants } from './variants';


const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  variants: inputVariants.wrapper,

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

const InputWrapper = styled('div', {
  position: 'relative',
  variants: inputVariants.icons,

  '#before, #after': {
    position: 'absolute',

    top: '50%',
    transform: 'translateY(-50%)',
    color: '$text',
  },

  '#before': {
    left: '0.825rem',
    color: '$highlight',
  },
  
  '#after': {
    right: '0.825rem',
    color: '$highlight',
  },

  '& > input': {
    width: '100%',
    padding: '0.75rem',

    color: '$text',
    backgroundColor: '$secondary',

    fontFamily: '$code',
    fontSize: '1rem',

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
  },

  '@xl': {
    '& > input': {
      padding: '0.8125rem',
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
    },
  },
});

export { Wrapper, InputWrapper };