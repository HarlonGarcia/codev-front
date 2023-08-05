import { styled } from '../../../styles';
import { WrapperWithPadding } from '../../../styles/wrapper';

const Container = styled(WrapperWithPadding, {
  maxWidth: '80rem',
  margin: '0 auto',
});

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
});

const InputGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',

  marginBottom: '1.5rem',
  
  '& > label': {
    color: '$title',
    fontSize: '1.125rem',
    fontWeight: '600',
  },

  '& > input, & > textarea': {
    padding: '0.5rem',
    
    color: '$text',
    backgroundColor: '$secondary',
    border: 'none',
    borderRadius: '0.25rem',
    fontSize: '1rem',
    fontFamily: '$code',
    
    outline: 'none',
    resize: 'none',

    '&::placeholder': {
      color: '$text',
      filter: 'brightness(0.5)',
    },
  },

  '& > input': {
    maxWidth: '48rem',
  },

  '& > textarea': {
    minHeight: '16rem',
  },

  '@xs': {
    gap: '1rem',
    marginBottom: '2.25rem',

    '& > input, & > textarea': {
      padding: '0.75rem',
    },
  },

  '@md': {
    marginBottom: '3rem',

    '& > input, & > textarea': {
      padding: '1rem',
      fontSize: '1.25rem',
    },
  },

  '@lg': {
    '& > label': {
      fontSize: '1.5rem',
    },
  },
});

const Group = styled('div', {
  display: 'grid',
  flexWrap: 'wrap',
  gap: '3rem',
  gridTemplateColumns: 'repeat(2, 1fr)',

  marginBottom: '2rem',
  
  '& > div': {
    position: 'relative',

    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    
    '& > label': {
      color: '$title',
      fontSize: '1.125rem',
      fontWeight: '600',
    },

    '& > input': {
      width: '100%',
      padding: '0.5rem',
      
      color: '$text',
      backgroundColor: '$secondary',
      border: 'none',
      borderRadius: '0.25rem',
      
      fontSize: '1rem',
      fontFamily: '$code',

      outline: 'none',
      resize: 'none',
    },
  
    '& > ul': {
      position: 'absolute !important',
      width: '100%',
      height: 'fit-content',
      top: '6rem !important',
  
      color: '$secondary',
      background: '$text',
      borderRadius: '0.25rem',
  
      fontSize: '1rem',
      fontWeight: '600',
  
      listStyle: 'none',
      overflow: 'hidden',
  
      '& > li': {
        padding: '0.5rem',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
  
        '&:hover': {
          backgroundColor: '$title',
        },
      },
    },

    '.toggle': {
      width: 'fit-content',
      height: '100%',

      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',

      '&:hover > *': {
        filter: 'brightness(0.9)',
      },

      '& > *': {
        width: '1.25rem',
        height: '1.25rem',
        color: '$highlight',

        transition: 'all 0.3s ease-in-out',
      },

      '& > small': {
        width: 'fit-content',
        height: 'fit-content',
        fontSize: '1rem',
        fontWeight: '600',
      },

      '&[data-state="on"]': {
        '& > *': {
          color: '$alert',
        },

        '& > :first-child': {
          transform: 'rotate(180deg)',
        },
      },
    }
  },

  '@xs': {
    marginBottom: '2.5rem',
    
    '& > div ': {
      gap: '1rem',

      '& > input, & > ul > li': {
        padding: '0.75rem',
      },
  
      '& > ul': {
        bottom: '-3.25rem',
      },
    },
  },

  '@md': {
    gap: '1.5rem',

    '& > div': {
      '& > input & > ul > li': {
        padding: '1rem',
      },
    
      '& > ul': {
        bottom: '-3.5rem',
      },

      '.toggle': {
        '& > *': {
          width: '1.5rem',
          height: '1.5rem',
        },
  
        '& > small': {
          height: 'fit-content',
          fontSize: '1.25rem',
        },
      }
    },
  },

  '@lg': {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2.5rem',

    marginBottom: '3.5rem',

    '& > div': {
      width: '18rem',

      '& > label': {
        fontSize: '1.5rem',
      },
    } 
  },
});

const Submit = styled('input', {
  width: 'fit-content',
  padding: '0.75rem 2rem',

  color: '$highlight',
  backgroundColor: '$secondary',
  fontWeight: '600',

  border: 'none',
  borderRadius: '0.25rem',
  outline: 'none',

  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  
  '&:hover': {
    color: '$secondary',
    backgroundColor: '$highlight',
  },

  '@xs': {
    padding: '1rem 3rem',
    fontSize: '1.125rem',
  }
});

export { Container, Form, InputGroup, Group, Submit };