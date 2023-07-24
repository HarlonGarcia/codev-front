import { styled } from '../../styles';

const Root = styled('div', {
  display: 'grid',
  gridTemplateColumns: '4fr 1fr',

  maxWidth: '24rem',
  margin: '0 auto',

  border: '2px solid transparent',
  borderRadius: '0.375rem',
  overflow: 'hidden',

  transition: 'all 0.3s ease-in-out',

  '&:focus-within': {
    borderColor: '$text',
  },

  '&[disabled]': {
    cursor: 'not-allowed',
    opacity: 0.6
  },

  '@xs': {
    gridTemplateColumns: '5fr 1fr',
  }
});

const Content = styled('input', {
  width: '100%',
  padding: '0.5rem 1rem',

  color: '$text',
  fontWeight: 'bold',
  backgroundColor: '$secondary',
  border: 'none',
  outline: 'none',

  '&::placeholder': {
    color: '$text',
    opacity: 0.4,
  },
});

const Action = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  color: '$secondary',
  background: '$text',

  '& > *': {
    height: '55%',
    width: '55%',
  },

  '&[disabled]': {
    cursor: 'not-allowed',
    opacity: 0.6
  },
});

export { Root, Content, Action };