import { styled } from '../../styles';

const Root = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  width: '100%',

  padding: '0.75rem',

  background: '$secondary',
  borderRadius: '0.5rem',

  '& > div': {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },

  '@xs': {
    flexDirection: 'column',
    width: '47.5%',
    maxWidth: '12rem',
    padding: '1.25rem 0.75rem',

    boxShadow: '0px 2px 6px rgba(5, 0, 10, 0.4)',

    '& > div': {
      flexDirection: 'column',
      alignItems: 'center',
    }
  },
});

const Avatar = styled('img', {
  width: '3rem',
  height: '3rem',
  
  borderRadius: '50%',

  '@xs': {
    width: '5rem',
    height: '5rem',
  },
});

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  '& > strong': {
    marginBottom: '0.5rem',
    color: '$text',
    textTransform: 'capitalize',
    fontSize: '0.875rem',
    fontWeight: 600,
  },

  '@xs': {
    alignItems: 'center',
    marginBottom: '1.25rem',
    
    '& > strong': {
      marginBottom: '0.75rem',
    },
  },
});

const Labels = styled('ul', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.25rem',

  listStyle: 'none',

  '& > li': {
    padding: '0.25rem',

    fontSize: '0.625rem',
    fontWeight: 600,

    color: '$highlight',
    backgroundColor: '$primary',

    borderRadius: '0.25rem',
  },

  '@xs': {
    gap: '0.75rem',
  },
});

const LinksPopover = styled('div', {
  position: 'relative',
  display: 'flex',
  padding: '0.25rem',
  
  '& > button': {
    display: 'flex',
    alignItems: 'center',
    
    borderRadius: '50%',
    transition: 'background-color 0.2s',
    
    '&:hover': {
      backgroundColor: '$shadow',
    },

    '& > *': {
      color: '$text',
      width: '1.75rem',
      height: '1.75rem',
    },
  },

  '@xs': {
    display: 'none !important',
  }
});

const Contacts = styled('div', {
  display: 'none !important',
  justifyContent: 'center',
  flexDirection: 'row !important',
  gap: '0.75rem',

  '& > a > *': {
    width: '1.25rem',
    height: '1.25rem',
  
    color: '$text',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',

    '&:hover': {
      color: '$title',
    },
  },

  '@xs': {
    display: 'flex !important',
  },
});

export { Root, Avatar, Content, Labels, LinksPopover, Contacts };