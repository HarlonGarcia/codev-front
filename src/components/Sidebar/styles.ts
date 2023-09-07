import { styled } from '../../styles';

const Container = styled('div', {
  position: 'fixed',
  bottom: 0,
  left: 0,

  height: 'calc(100vh - $navbarHeight)',
  width: '16rem',
  
  display: 'flex',
  flexDirection: 'column',

  padding: '2rem',
  background: '$secondary',

  transition: 'all 0.3s ease-in-out',

  '& > .separator': {
    margin: '1.5rem 0 2rem 0',
    height: '2px',
    backgroundColor: '$secondary',
    background: '-webkit-linear-gradient(left, rgba(5, 2, 25, 0.4) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(5, 2, 25, 0.4) 100%)',
  },

  variants: {
    view: {
      OPENED: {
        transform: 'translateX(0)',
      },
      CLOSED: {
        transform: 'translateX(-100%)',
      }
    }
  }
});

const Header = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  fontWeight: 600,

  '& > span': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  '& >:last-child': {
    padding: '0.25rem',
    borderRadius: '50%',
    cursor: 'pointer',

    '& > *': {
      width: '1.75rem',
      height: '1.75rem',
      color: '$text',

      transition: 'all 0.3s ease-in-out',

      '&:hover': {
        color: '$title',
      },
    }
  },
});

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  overflow: 'auto',

  '& > a': {
    display: 'flex',
    gap: '1rem',

    color: '$text',
    fontWeight: 600,
    fontSize: '1.375rem',
    textDecoration: 'none',

    transition: 'all 0.3s ease-in-out',

    '&:hover': {
      color: '$highlight',
    },
  }
});

export { Container, Header, Content };