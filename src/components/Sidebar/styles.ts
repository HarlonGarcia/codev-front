import { styled } from 'styles';

const Container = styled('div', {
  position: 'fixed',
  top: '$navbarHeight',
  left: '0',

  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100% - $navbarHeight)',
  width: '16rem',
  padding: '2rem 2rem',
  
  transition: 'all 300ms ease-in-out',
  backgroundColor: '$secondary',
  boxShadow: '0 0 12px #000',
  borderRadius: '0 0.5rem 0 0',

  variants: {
    visible: {
      false: {
        transform: 'translateX(-100%)',
      },
    },
  },
});

const Header = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '2rem',
});

const Body = styled('div', {
  hr: {
    borderBottom: '1px solid $coolgrey',
  }
});

const Toggle = styled('button', {
  position: 'absolute',
  top: '1rem',
  right: '0.5rem',
  zIndex: 1000,
  
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '8rem',

  padding: '0.5rem 0.75rem',
  fontSize: '1.125rem',
  borderRadius: '0 0.5rem 0.5rem 0',
  color: '$error',
  backgroundColor: 'transparent',

  transition: 'all 200ms ease-in-out',

  '> span': {
    fontSize: '1rem',
  },

  variants: {
    visible: {
      false: {
        color: '$highlight',
        gap: '1rem',
        right: '-7.5rem',

        '> svg': {
          transform: 'rotate(180deg)',
        },
      },
    },
  },
});

const List = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  padding: '0',
  marginTop: '2rem',

  '> a': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    listStyle: 'none',
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    transition: 'all 0.5s ease-out',
    color: '$lavender',
    borderRadius: '0.5rem',

    '&:hover': {
      backgroundColor: 'rgba(5, 0, 20, 0.3)',
    },
  },
});

const Footer = styled('div', {
  marginTop: 'auto',

  '> a': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontWeight: '600',

    '> svg': {
      width: '1.25rem',
      height: '1.25rem',
    }
  }
});

export {
  Container,
  Header,
  Body,
  Footer,
  Toggle,
  List,
};