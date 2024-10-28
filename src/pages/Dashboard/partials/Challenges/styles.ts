import { styled } from 'styles';

const Container = styled('div', {
});

const Header = styled('header', {
  marginBottom: '4rem',

  h1: {
    fontSize: '2rem',
    fontWeight: 600,
  },
  p: {
    fontSize: '1.125rem',
  },
});

const ChallengesContainer = styled('div', {
  marginTop: '4rem',
});

const ChallengesHeader = styled('div', {
  display: 'flex',
  justifyContent:'space-between',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '2rem',

  '> h2': {
    fontFamily: '$code',
    fontSize: '1.5rem',
  },
});

const Filters = styled('div', {
  display: 'flex',
  gap: '1rem',
});

const Actions = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
});

const Order = styled('button', {
  fontSize: '1.25rem',

  transition: 'all 0.3s ease-in-out',

  '&:hover': {
    color: '$textDarker',
  },
});

const Toggle = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  variants: {
    active: {
      list: {
        '> :first-child': {
          color: '$highlight',
        },
      },
      grid: {
        '> :last-child': {
          color: '$highlight',
        },
      },
    },
  },

  '> button': {
    fontSize: '1.25rem',
    padding: '0.375rem 0',
    backgroundColor: '$secondary',

    transition: 'all 0.3s ease-in-out',

    '&:hover': {
      color: '$textDarker',
    },
  },
  '> :first-child': {
    paddingLeft: '0.375rem',
    paddingRight: '0.25rem',
    borderRadius: '0.25rem 0 0 0.25rem',
  },
  '> :last-child': {
    paddingRight: '0.375rem',
    paddingLeft: '0.25rem',
    borderRadius: '0 0.25rem 0.25rem 0',
  },
});

const List = styled('div', {
});

const ListItem = styled('div', {

});

export {
  Container,
  Header,
  ChallengesContainer,
  ChallengesHeader,
  Filters,
  Actions,
  Order,
  Toggle,
  List,
  ListItem,
}