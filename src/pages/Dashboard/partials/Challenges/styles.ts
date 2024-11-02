import { styled } from 'styles';

const ChallengesHeader = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
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
  flexWrap: 'wrap',
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
  display: 'flex',
  flexDirection: 'column',
  gap: '0.375rem',
});

const ListItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  background: '$secondary',
  padding: '1rem 1.5rem',
  borderRadius: '0.75rem',
  marginBottom: '0.5rem',

  '.challenge': {
    display: 'flex',
    alignItems: 'center',
    gap: '4rem',

    '&-info': {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',

      '&-category, &-techs, &-status': {
        padding: '0.25rem 0.375rem',
        borderRadius: '0.25rem',
        fontWeight: 600,
      },

      '&-category': {
        color: '$primary',
        background: '$text',
      },

      '&-techs': {
        color: '$primary',
        background: '$highlight',
      },

      '&-status':{
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',

        '> small': {
          fontWeight: '600',
          fontSize: '1rem',
        },
        '> svg': {
          fontSize: '0.75rem',
        },
      },
    },
  },
});

const Title = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',

  '> small': {
    fontSize: '1rem',
  },
  '> strong': {
    color: '$highlight',
    fontFamily: '$code',
    fontWeight: 600,
  },
});

const ChallengeActions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
});

const Action = styled('button', {
  fontSize: '1.5rem',
  padding: '0.5rem',
  backgroundColor: 'transparent',
  borderRadius: '0.5rem',

  transition: 'all 0.3s ease-in-out',

  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: '3rem 1.5rem',

  '@sm': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@lg': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  '@xl2': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  '@xl4': {
    gridTemplateColumns: 'repeat(5, 1fr)',
  }
});

const GridItem = styled('div', {
  padding: '1rem',
  background: '$secondary',
  borderRadius: '0.75rem',

  '&:hover': {
    '.grid-item-info > strong > svg': {
      opacity: '1',
    },
  },

  '.grid-item-info': {
    display: 'flex',
    flexDirection: 'column',

    '> strong': {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',

      fontSize: '1.125rem',
      fontWeight: 600,
      color: '$highlight',
      fontFamily: '$code',

      '> svg': {
        opacity: '0',
        fontSize: '1.5rem',
        transition: 'all 300ms ease-in-out',
        cursor: 'pointer',

        '&:hover': {
          color: '$highlightDarker',
        },
      },
    },
    '&-badges': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginTop: '1.25rem',

      '> span': {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',

        width: 'fit-content',
        padding: '0.375rem 0.75rem',
        background: '$primary',
        borderRadius: '0.5rem',
        fontSize: '1rem',
        fontWeight: 600,

        '> svg': {
          fontSize: '0.5rem',
        },
      },

      '&-techs': {
        color: '$highlight',
      },
    },
  },

  img: {
    width: '100%',
    objectFit: 'cover',
    height: '15rem',
    marginBottom: '1.5rem',
    borderRadius: '0.5rem',
  },
});

export {
  ChallengesHeader,
  Filters,
  Actions,
  Order,
  Toggle,
  List,
  ListItem,
  Title,
  ChallengeActions,
  Action,
  Grid,
  GridItem,
}