import { styled } from 'styles';
import { WrapperWithPadding } from 'styles/wrapper';

const Container = styled(WrapperWithPadding, {
  '& > div': {
    maxWidth: '30rem',
    margin: '0 auto',
  },
});

const AccountHeader = styled('header', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  marginBottom: '1.75rem',

  '@sm': {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',

    gap: '1.75rem',
  },
});

const Avatar = styled('img', {
  height: '8rem',
  width: '8rem',

  marginBottom: '1rem',

  borderRadius: '50%',
  boxShadow: '0px 1px 6px #101',
  transition: 'all 0.3s ease-in-out',

  '&:hover': {
    filter: 'brightness(0.6)',
  },
});

const AccountInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '& > h2': {
    color: '$highlight',
    fontWeight: '600',
    fontSize: '1.75rem',
    marginBottom: '0.5rem',
  },

  '& div': {
    display: 'flex',
    gap: '0.5rem',
  },

  '@sm': {
    alignItems: 'flex-start',
    padding: '1rem 0',
  },
});

const AccountContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  marginBottom: '3rem',
});

const Option = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',

  fontSize: '1.25rem',
  borderRadius: '0.25rem',
  cursor: 'pointer',

  transition: 'all 0.3s ease-in-out',

  '&:hover': {
    color: '$title',
  },
});

const Divider = styled('div', {
  margin: '1rem 0',
  borderTop: '2px solid $secondary',
});

const Contact = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  color: '$text',

  fontSize: '1.25rem',
});

const AccountFooter = styled('footer', {
  '& button': {
    padding: '0.625rem 0.875rem',

    fontSize: '1rem',
    fontWeight: '600',

    background: 'rgba(250, 100, 100, 0.5)',
    color: '$primary',
    borderRadius: '0.25rem',

    transition: 'all 0.3s ease-in-out',

    '&:hover': {
      background: '$error',
    },
  },
});

export {
  Container,
  AccountHeader,
  Avatar,
  AccountInfo,
  AccountContent,
  Option,
  Divider,
  Contact,
  AccountFooter,
};