import { styled } from '../../styles';
import { WrapperWithPadding } from '../../styles/wrapper';

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

  '@md': {
    '& > div': {
      '& > .separator': {
        margin: '4rem 3rem',
      },
    },
  },
});

export { Container };
