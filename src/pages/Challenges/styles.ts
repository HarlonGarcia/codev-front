import { styled } from 'styles';
import { WrapperWithPadding } from 'styles/wrapper';

const Container = styled(WrapperWithPadding, {
  display: 'flex',
  flexDirection: 'column',

  '& > div': {
    '& > .separator': {
      margin: '3rem',
      height: '1px',
      backgroundColor: '$secondary',
      background:
        '-webkit-linear-gradient(left, rgba(5, 2, 25, 0.4) 0%, rgba(124, 58, 237, 0.3) 50%, rgba(5, 2, 25, 0.4) 100%)',
    },
  },

  '& > div:last-child': {
    '& > .separator': {
      display: 'none',
    },
  },

  '& > button': {
    width: 'fit-content',
    padding: '1rem 2rem',
    borderRadius: '0.5rem',
    marginTop: '2rem',
    boxShadow: '0 0 12px rgba(5, 2, 25, 0.5), 0 0 24px rgba(5, 2, 25, 0.5), 0 0 36px rgba(5, 2, 25, 0.5)',
    backgroundColor: '$secondary',
  },

  '@md': {
    '& > div': {
      '& > .separator': {
        margin: '4rem 3rem',
      },
    },
  },
});

export { Container };
