import { styled } from 'styles';
import { selectVariants } from './variants';

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  variants: selectVariants.wrapper,

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

const ContentArea = styled('select', {
  width: '100%',

  padding: '0.75rem 3.5rem 0.75rem 1rem',
  textAlign: 'center',
  margin: 0,
  
  fontFamily: '$code',
  fontSize: '1rem',
  lineHeight: '1.5em',

  color: '$text',
  backgroundColor: '$secondary',
  borderRadius: '0.5rem',
  border: 'none',
  outline: 'none',

  boxSizing: 'border-box',
  '-webkit-box-sizing': 'border-box',
  '-moz-box-sizing': 'border-box',
  '-webkit-appearance': 'none',
  '-moz-appearance': 'none',

  backgroundImage: 'linear-gradient(45deg, transparent 50%, #c392ef 50%), linear-gradient(135deg, #c392ef 50%, transparent 50%), linear-gradient(to right, #c392ef, #c392ef)',
  backgroundPosition: 'calc(100% - 20px) calc(1em + 6px), calc(100% - 15px) calc(1em + 6px), calc(100% - 2.5em) 0.75em',
  backgroundSize: '5px 5px, 5px 5px, 1px 1.5em',
  backgroundRepeat: 'no-repeat',
  
  '&:disabled': {
    cursor: 'not-allowed',
    filter: 'brightness(0.8) grayscale(0.4)',
  },
});

const Option = styled('option', {
  backgroundColor: '$secondary',
  color: '$text',
  textAlign: 'start',

  variants: selectVariants.option,
});

export {
  Wrapper,
  ContentArea,
  Option,
};