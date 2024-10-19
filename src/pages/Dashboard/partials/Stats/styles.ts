import { Grid, GridItem } from '@chakra-ui/react';
import { styled } from 'styles';

const Container = styled('div', {
});

const GridContainer = styled(Grid, {
  '> div': {
    borderRadius: '1rem',
  },
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

const ChallengesInfo = styled(GridItem, {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$secondary',
  padding: '2rem',

  h2: {
    color: '$coolgrey',
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
  },
  p: {
    color: '$lavender',
    fontSize: '1.125rem',
    marginBottom: '2rem',
    letterSpacing: '0.5px',
  },
});

const ChallengesStatuses = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  marginTop: 'auto',
});

const StatusInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent:'space-between',
  alignItems: 'center',

  padding: '1rem',
  gap: '1rem',

  fontFamily: '$code',
  fontWeight: 600,
  color: '$primary',
  borderRadius: '0.5rem',

  '> svg': {
    fontSize: '1.25rem',
  },
});

const Streak = styled(GridItem, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  padding: '1rem',
  background: 'linear-gradient(to top, rgba(134, 37, 223, 0.6), transparent)',
  letterSpacing: '1px',
  color: '$lavender',

  '> div': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontFamily: 'coursive',
    fontSize: '2.75rem',
    fontWeight: '600',
    color: '$text',
  },
  '> span': {
    fontSize: '1.25rem',
  },
  '> small': {
    fontSize: '1rem',
  },
});

export {
  Container,
  GridContainer,
  Header,
  ChallengesInfo,
  ChallengesStatuses,
  StatusInfo,
  Streak,
}