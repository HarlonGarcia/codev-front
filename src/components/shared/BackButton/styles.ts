import { styled } from 'styles';

const Button = styled('button', {
  '> svg': {
    padding: '0.5rem',
    borderRadius: '50%',
    fontSize: '2rem',
    color: '$coolgrey',
    backgroundColor: '$secondary',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',

    '&:hover': {
      color: '$lavender',
    },
  },
});

export { Button }