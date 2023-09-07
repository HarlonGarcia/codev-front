import { styled } from '../../../../styles';
import { WrapperWithPadding } from '../../../../styles/wrapper';

const Container = styled(WrapperWithPadding, {
  color: '$title',

  '& > h2': {
    marginBottom: '1.5rem',
  },
});

const UsersList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
});

const UserRow = styled('li', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1.5rem',
  background: '$secondary',
  borderRadius: '0.5rem',
});

const UserContent = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  fontFamily: '$code',

  '> small': {
    color: '$highlight',
    fontWeight: 600,
  },

  '@lg': {
    '> small': {
      fontSize: '1rem',
    },
    '> strong': {
      fontSize: '1.25rem',
    }
  }
});

const Actions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

const Action = styled('button', {
  display: 'flex',
  color: '$title',
  transition: 'color 0.3s ease-in-out',

  '& > *': {
    width: '1.25rem',
    height: '1.25rem',
  },

  variants: {
    action: {
      delete: {
        '&:hover': {
          color: '$error',
        }
      },
      edit: {
        '&:hover': {
          color: '$highlight',
        }
      },
      view: {
        '&:hover': {
          color: '$alert',
        }
      },
    }
  },
});

export { Container, UsersList, UserRow, UserContent, Actions, Action };