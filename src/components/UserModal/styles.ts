import { styled } from '../../styles';

const Overlay = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,

  height: '100%',
  width: '100%',

  backgroundColor: 'rgba(0, 0, 0, 0.7)',

  variants: {
    state: {
      closed: {
        display: 'none',
      },
      opened: {
        display: 'blocked',
      },
    },
  },
});

const Modal = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',

  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  transform: 'translate(-50%, -50%)',
  padding: '2rem',

  backgroundColor: '$secondary',
  borderRadius: '0.5rem',
  boxShadow: '0 0 0.5rem $shadow',

  '@lg': {
    padding: '3rem',
  }
});

const Header = styled('header', {
  marginBottom: '1rem',
});

const Content = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)',
  gap: '1.75rem',

  marginBottom: '1.5rem',

  '@lg': {
    marginBottom: '2rem',
  }
});

const Field = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.375rem',

  '> small': {
    fontWeight: '400',
    color: '$text',
  },

  '> span': {
    color: '$highlight',
  }
});

const Footer = styled('footer', {
  display: 'flex',
  gap: '1rem',

  '& > button': {
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',

    '&.cancel': {
      background: 'transparent',
      border: '1px solid $title',
      color: '$title',

      '&:hover': {
        background: '$title',
        color: '$secondary',
        borderColor: 'transparent',
      },
    },

    '&.delete': {
      background: '$title',
      color: '$secondary',

      '&:hover': {
        background: '$error',
      },
    },
  },

  '@lg': {
    gap: '1.5rem',

    '& > button': {
      padding: '0.75rem 1.25rem',
      fontSize: '0.925rem',
      fontWeight: '600',
    },
  },
});

export { Overlay, Modal, Header, Content, Field, Footer };