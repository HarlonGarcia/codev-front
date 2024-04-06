import { styled } from '../../styles';

const PopoverTrigger = styled('button', {
  height: '1.75rem',
  width: '1.75rem',

  display: 'flex',

  backgroundColor: '$primary',
  borderRadius: '0.25rem',

  '&[data-state="open"]': {
    '& > *': {
      color: '$text',
    }
  },
  '&:hover': {
    '& > *': {
      color: '$title',
    }
  },

  '& > *': {
    width: '60%',
    height: '60%',

    margin: 'auto',

    color: '$secondary',
    transition: 'all 250ms ease-in-out',
  },

  '@sm': {
    display: 'none',
  }
});

const Content = styled('div', {
  position: 'absolute',
  top: '12px',
  right: '-10px',

  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  width: '10rem',

  padding: '1rem',

  background: '$glass',
  border: '1px solid $secondary',
  borderRadius: '0.25rem',
  backdropFilter: 'blur(4px)',

  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
});

const Option = styled('a', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',

  fontSize: '0.875rem',
  fontWeight: 600,
  color: '$text',
  border: 'none',

  transition: 'all 200ms ease-in-out',

  '&:hover': {
    color: '$title',
  },
});

export { PopoverTrigger, Content, Option };