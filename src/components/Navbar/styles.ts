import { styled } from 'styles';

const Container = styled('header', {
  position: 'fixed',

  height: '$navbarHeight',
  width: '$full',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: '0 2rem',
  zIndex: 2,

  backgroundColor: '$glass',
  borderBottom: '1px solid rgba(49, 46, 129, 0.2)',
  boxShadow: '0px 0px 1px rgba(129, 140, 248, 0.1)',
  backdropFilter: 'blur(6px)',

  '& > a > h3': {
    fontSize: '1.125rem',
    fontWeight: '900',
    background: 'linear-gradient(to right bottom, rgb(88, 28, 135), rgb(192, 38, 211), rgb(217, 70, 239))',
    backgroundClip: 'text',
    color: 'transparent'
  }
});

const Navigation = styled('nav', {
  display: 'none',
  alignItems: 'center',

  gap: '1rem',

  '@sm': {
    display: 'flex',
  }
});

const NavItems = styled('div', {
  display: 'flex',
  alignItems: 'center',

  gap: '2rem',
  marginRight: '1.5rem',

  '& > a, & > button': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',

    fontSize: '1rem',
    fontWeight: 600,
    color: '$text',

    transition: 'all 250ms ease-in-out',

    '&:hover': {
      color: '$title',
    },
  },
});

const LanguageToggle = styled('button', {
  backgroundColor: '$text',
  padding: '0.25rem',
  borderRadius: '0.25rem',
  transition: 'all 250ms ease-in-out',

  '> svg': {
    color: '$primary',
  }
});

export { Container, Navigation, NavItems, LanguageToggle };