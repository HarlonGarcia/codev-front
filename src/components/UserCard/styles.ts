import { styled } from '../../styles';

const Root = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  padding: '0.75rem',

  background: '$secondary',
  borderRadius: '0.5rem',

  '& > div': {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  }
});

const Avatar = styled('img', {
  width: '3rem',
  height: '3rem',
  
  borderRadius: '50%',
});

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  '& > strong': {
    fontSize: '0.875rem',
    marginBottom: '0.5rem',
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
    gap: '0.5rem',
  },
});

const Links = styled('div', {
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
  }
});

const MenuContext = styled('div', {
  position: 'absolute',
  bottom: '-1.625rem',
  right: '-0.75rem',

  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',

  padding: '0.5rem',
  backgroundColor: '$primary',
  borderRadius: '0.5rem',

  '& > a': {
    display: 'flex',
    alignItems: 'center',

    color: '$text',

    transition: 'color 0.2s ease-in-out',

    '&:hover': {
      color: '$highlight',
    }
  },
});

export { Root, Avatar, Content, Labels, Links, MenuContext };