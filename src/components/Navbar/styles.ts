import { styled } from '../../styles';

const Container = styled('header', {
  position: 'fixed',

  height: '$navbarHeight',
  width: '$full',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: '0 2rem',

  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(5px)',
});

const Navigation = styled('nav', {
  display: 'none',
  alignItems: 'center',

  gap: '1rem',

  '@xs': {
    display: 'flex',
  }
});

const Menu = styled('button', {
  height: '1.75rem',
  width: '1.75rem',

  display: 'flex',

  backgroundColor: 'rgba(20, 20, 20, 0.2)',
  border: '1px solid $title',
  borderRadius: '0.25rem',

  '@xs': {
    display: 'none',
  }
});

export { Container, Navigation, Menu };