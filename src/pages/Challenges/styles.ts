import { styled } from '../../styles';
import { WrapperWithPadding } from '../../styles/wrapper';

const Container = styled(WrapperWithPadding, {
  display: 'flex',
  flexDirection: 'column',

  backgroundColor: '$primary',
  background: 'linear-gradient(to top left, rgba(124, 58, 237, 0.15), rgb(2, 1, 10))',

  '& > div': {
    '& > .separator': {
      margin: '3rem',
      height: '1px',
      backgroundColor: '$secondary',
      background: '-webkit-linear-gradient(left, rgba(5, 2, 25, 0.4) 0%, rgba(124, 58, 237, 0.3) 50%, rgba(5, 2, 25, 0.4) 100%)',
    } 
  },

  '& > div:last-child': {
    '& > .separator': {
      display: 'none',
    }
  },
});

export { Container };