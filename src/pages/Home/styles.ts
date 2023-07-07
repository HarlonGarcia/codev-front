import { styled } from '../../styles';
import { Wrapper } from '../../styles/wrapper';

const Container = styled(Wrapper, {
  backgroundColor: '$primary',
});

const Hero = styled('section', {
  padding: '2.5rem',
});

const Title = styled('h1', {
  variants: {
    font: {
      code: {
        fontFamily: '$code',
      },
    }
  },
});

export { Container, Hero, Title };