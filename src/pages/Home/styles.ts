import { styled } from '../../styles';
import { Wrapper } from '../../styles/wrapper';

const Container = styled(Wrapper, {
  backgroundColor: '$primary',
});

const Title = styled('h1', {});

export { Container, Title };